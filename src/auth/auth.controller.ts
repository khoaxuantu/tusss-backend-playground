import { CreateUserDto } from '@/user/dto/create_user.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Post } from '@nestjs/common';

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
