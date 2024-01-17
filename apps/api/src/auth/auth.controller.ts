import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';

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
    const { username, password } = await this.authService.decryptPayload(
      {
        encryptedUsername: createUserDto.username,
        encryptedPassword: createUserDto.password,
      },
      createUserDto.randomId,
      createUserDto.publicKey
    );
    const hashedPassword = this.authService.hashPassword(password);
    this.logger.log('encrypted username: '+ createUserDto.username);
    this.logger.log('decrypted username: '+ username);
    this.logger.log('encrypted password: '+ createUserDto.password);
    this.logger.log('decrypted password: '+ password);
    this.logger.log('hashed password: '+ hashedPassword);
    user.username = username;
    user.password = hashedPassword;
    user.country = createUserDto.country;
    user.name = createUserDto.name;
    user.phoneNumber = createUserDto.phoneNumber;
    this.authService.createUser(user);

    return { message: 'User created', status: 'success' };
  }

  @Post('signIn')
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() request: { user: User }) {
    return {
      message: 'User authenticated',
      token: this.authService.getTokenForUser(request.user),
      // country: request.user.country,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() request) {
    console.log('WHY JWT');
    return request.user;
  }
}
