import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ExtractJwt } from 'passport-jwt';
import { User } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(PassportStrategy.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.NX_JWT_SECRET,
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async validate(payload: any) {
        this.logger.debug(`JWT Strategy validate ${payload.sub}`)
        return await this.userRepository.findOneBy({id: payload.sub});
    }
}
