import { UserService } from '@/user/user.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { SignInDto } from './dto/sign_in.dto';

@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    await this.userService.saveOne(user);
    return 'Create successfully!';
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: SignInDto,
    examples: {
      login_dto: { value: JSON.stringify({ email: 'tusss@tusss.com', password: '1@!33sdjifHH' }) },
    },
  })
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() req) {
    return req.user;
  }
}
