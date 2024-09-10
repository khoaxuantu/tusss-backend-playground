import { SuccessApiResponseMessage } from '@libs/dto/out/response.dto';
import { Body, Controller, Get, Param, Patch, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private config: ConfigService,
    private userService: UserService,
  ) {}

  @Get()
  index() {
    console.log('Get config in app controller', this.config.get('tusss'));

    return "This is the User's entry route";
  }

  @Get('find/:id')
  getOne(@Param('id') userId: string) {
    return `Get one user`;
  }

  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Patch('profile/update')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: SuccessApiResponseMessage<string> })
  async updateProfile(@Body() user: UpdateUserDto): Promise<SuccessApiResponseMessage<string>> {
    console.log("🚀 ~ UserController ~ updateProfile ~ user:", user)
    await this.userService.updateOne(user);

    return {
      status: 'success',
      message: 'Profile updated successfully!',
    };
  }
}
