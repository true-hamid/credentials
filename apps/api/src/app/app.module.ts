import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/user.entity';
import { Encrypt } from '../auth/ecrypt.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NX_DB_HOST,
      port: Number(process.env.NX_DB_PORT),
      username: process.env.NX_DB_USERNAME,
      password: process.env.NX_DB_PASSWORD,
      database: process.env.NX_DB,
      entities: [User, Encrypt],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
