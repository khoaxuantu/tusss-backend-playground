import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign_in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(props: SignInDto) {
    const user = await this.userService.getOneByEmail(props.email);
    if (user?.password != props.password) throw new UnauthorizedException();
    const payload = { sub: user._id.toString(), username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
