import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/user.entity';
import { Profile } from '../auth/profile.entity';
import { AuthController } from '../auth/auth.controller';
import { Encrypt } from '../auth/ecrypt.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'credentials',
      entities: [User, Profile, Encrypt],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
