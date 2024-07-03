import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign_in.dto';
import { AuthService } from './auth.service';
import { Public } from './decorator/auth.decorator';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
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
      login_dto: { value: JSON.stringify({ email: 'tusss@tusss.com', password: 'lmaoEz@2000' }) },
    },
  })
  @ApiOkResponse()
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
}
