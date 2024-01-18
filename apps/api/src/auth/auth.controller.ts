import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { ERROR_CODES } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthService.name);

  @Get()
  async getAuthParams() {
    return this.authService.getAuthParams();
  }

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    const existingUser = this.authService.validateUserExists(user.username);
    if (existingUser) {
      throw new HttpException(
        ERROR_CODES.INVALID_SIGN_UP_USERNAME_EXIST,
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    const { username, password } = await this.authService.decryptPayload(
      {
        encryptedUsername: createUserDto.username,
        encryptedPassword: createUserDto.password,
      },
      createUserDto.randomId,
      createUserDto.publicKey
    );
    const hashedPassword = this.authService.hashPassword(password);
    user.username = username;
    user.password = hashedPassword;
    user.country = createUserDto.country;
    user.name = createUserDto.name;
    user.phoneNumber = createUserDto.phoneNumber;
    if (createUserDto?.pushNotificationId) {
      user.pushNotificationId = createUserDto.pushNotificationId;
    }
    this.authService.createUser(user);

    return { message: 'User created', status: 'success' };
  }

  @Post('signIn')
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() request: { user: User }) {
    return {
      message: 'User authenticated',
      token: this.authService.getTokenForUser(request.user),
      country: request.user.country,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() request) {
    console.log('WHY JWT');
    return request.user;
  }
}
