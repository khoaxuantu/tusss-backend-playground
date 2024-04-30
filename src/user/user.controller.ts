import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';

@Controller('user')
export class UserController {
  constructor(private config: ConfigService, private userService: UserService) {}

  @Get()
  index() {
    console.log("Get config in app controller", this.config.get('tusss'));

    return "This is the User's entry route";
  }

  @Post('create')
  createOne(@Body() user: CreateUserDto) {
    this.userService.saveOne(user);
    return 'Create successfully!';
  }

  @Get(':id')
  getOne(@Param('id') userId: string) {
    return `Get one user`;
  }
}
