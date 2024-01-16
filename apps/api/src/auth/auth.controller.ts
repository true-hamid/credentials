import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAuthParams() {
    return this.authService.getAuthParams();
  }

  @Post('signIn')
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() request: {user: User}) {
    return {
      message: 'User authenticated',
      token: this.authService.getTokenForUser(request.user),
      // country: request.user.country,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() request) {
    console.log('WHY JWT')
    return request.user;
  }
}
