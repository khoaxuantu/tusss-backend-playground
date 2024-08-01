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
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator/auth.decorator';
import { CreateUserDto } from './dto/create_user.dto';
import { SignInDto } from './dto/sign_in.in.dto';

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
  async signIn(@Request() req: any) {
    return this.authService.signIn(req.user);
  }
}
