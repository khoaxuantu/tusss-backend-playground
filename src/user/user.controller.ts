import { Body, Controller, Get, Param, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update_user.dto';

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

  @Get(':id')
  getOne(@Param('id') userId: string) {
    return `Get one user`;
  }

  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('profile/update')
  @ApiBearerAuth()
  async updateProfile(@Body() user: UpdateUserDto) {
    await this.userService.updateOne(user);

    return {
      result: 'Success',
      message: 'Profile updated successfully!',
    };
  }
}
