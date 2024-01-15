import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user.entity';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Encrypt } from './ecrypt.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Encrypt]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.NX_JWT_SECRET,
        signOptions: { expiresIn: '180s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
