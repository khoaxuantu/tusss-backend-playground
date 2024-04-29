import { Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private config: ConfigService, private userService: UserService) {}

  @Get()
  index() {
    console.log("Get config in app controller", this.config.get('tusss'));

    return "This is the User's entry route";
  }

  @Post('create')
  createOne() {
    return 'Create one user';
  }

  @Get(':id')
  getOne(@Param('id') userId: string) {
    return `Get one user`;
  }
}