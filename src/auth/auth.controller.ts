import { UserService } from '@/user/user.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { SignInDto } from './dto/sign_in.dto';
import { AuthService } from './auth.service';
import { Public } from './auth.helper';

@Controller()
@Public()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    await this.userService.saveOne(user);
    return 'Create successfully!';
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() { email, password }: SignInDto) {
    return this.authService.signIn({ email, password });
  }
}
