import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-local';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { use } from 'passport';

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
      username: string;
      password: string;
      randomId: string;
      publicKey: string;
    };
  }): Promise<User> {
    const { username, password, randomId, publicKey } = body;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      this.logger.error(`User ${username} not found`);
      throw new Error(`User ${username} not found`);
    }
    const decryptedPassword = await this.authService.decryptPassword(
      password,
      randomId,
      publicKey
    );
    console.log('decryptedPassword: ', decryptedPassword);
    if (decryptedPassword !== user.password) {
      this.logger.error(`Invalid password for user ${username}`);
      throw new Error(`Invalid password for user ${username}`);
    }

    return user;
  }
}
