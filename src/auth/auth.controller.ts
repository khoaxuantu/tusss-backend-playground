import { UserService } from '@/user/user.service';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';

@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    console.log(user);

    const res = await this.userService.saveOne(user);
    console.log(res);

    return 'Create successfully!';
  }
}
