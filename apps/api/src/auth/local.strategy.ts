import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-local';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { ERROR_CODES } from './constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {
    super({ passReqToCallback: true });
  }

  public async validate({
    body,
  }: {
    body: {
      // payload: string;
      username: string;
      password: string;
      randomId: string;
      publicKey: string;
    };
  }): Promise<User> {
    const { /*payload,*/ username: encryptedUsername, password: encryptedPassword, randomId, publicKey } = body;
    // console.log('payload', payload);
    const payload = {
      encryptedUsername,
      encryptedPassword,
    }
    this.logger.log('REQYEST', encryptedUsername, encryptedPassword);

    const {username, password} = await this.authService.decryptPayload(
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
    if (this.authService.hashPassword(password) !== user.password) {
      this.logger.error(`Invalid password for user ${username}`);
      throw new HttpException(
        ERROR_CODES.INVALID_SIGN_IN_PASSWORD,
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    return user;
  }
}
