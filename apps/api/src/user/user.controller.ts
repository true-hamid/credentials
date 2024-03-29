import { Controller, Get, Logger, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() request) {
    return {
      username: request.user.username,
      country: request.user.country,
      name: request.user.name,
      phoneNumber: request.user.phoneNumber,
    };
  }
}
