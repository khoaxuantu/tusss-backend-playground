import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign_in.dto';
import { AuthService } from './auth.service';
import { Public } from './auth.constant';

@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  @ApiTags('Authentication')
  async signUp(@Body() user: CreateUserDto) {
    await this.userService.saveOne(user);
    return 'Create successfully!';
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: SignInDto,
    examples: {
      login_dto: { value: JSON.stringify({ email: 'tusss@tusss.com', password: '1@!33sdjifHH' }) },
    },
  })
  @ApiOkResponse()
  @ApiTags('Authentication')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiTags('Authentication')
  getProfile(@Request() req) {
    console.log("🚀 ~ AuthController ~ getProfile ~ req.user:", req.user)
    return req.user;
  }
}
