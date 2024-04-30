import { Controller, Get, Param } from '@nestjs/common';
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

  @Get(':id')
  getOne(@Param('id') userId: string) {
    return `Get one user`;
  }
}
