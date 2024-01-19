import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-local';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { ERROR_CODES } from './constants';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly notification: NotificationService
  ) {
    super({ passReqToCallback: true });
  }

  public async validate({
    headers,
    body,
  }: {
    headers: { channel: 'WEB' | 'MOBILE' };
    body: {
      username: string;
      password: string;
      randomId: string;
      publicKey: string;
    };
  }): Promise<User> {
    console.log('headers', headers);
    const {
      /*payload,*/ username: encryptedUsername,
      password: encryptedPassword,
      randomId,
      publicKey,
    } = body;

    const payload = {
      encryptedUsername,
      encryptedPassword,
    };
    this.logger.log('REQYEST', encryptedUsername, encryptedPassword);

    const { username, password } = await this.authService.decryptPayload(
      payload,
      randomId,
      publicKey
    );
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      this.logger.error(`User ${username} not found`);
      throw new HttpException(
        ERROR_CODES.INVALID_SIGN_IN_USERNAME,
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    const passwordMatch = this.authService.validatePasswordsMatch(
      password,
      user.password
    );
    this.logger.log(`user.password ${user.password}`);
    this.logger.log(`password ${password}`);
    this.logger.log(`passwordMatch ${passwordMatch}`);
    if (!passwordMatch) {
      this.logger.error(`Invalid password for user ${username}`);
      throw new HttpException(
        ERROR_CODES.INVALID_SIGN_IN_PASSWORD,
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    // Seccessful login, now we notify the use if on his mobile device if he/she has pushNotificationId
    if (headers.channel === 'WEB' && user.pushNotificationId) {
      this.notification.sendPushNotification(user.pushNotificationId);
      this.logger.log(
        `Sending push notification to ${user.pushNotificationId}`
      );
    }

    return user;
  }
}
