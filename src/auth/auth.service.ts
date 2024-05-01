import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign_in.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(props: SignInDto) {
    const user = await this.userService.getOneByEmail(props.email);
    if (user?.password != props.password) throw new UnauthorizedException();
    return this.userService.sendUserInfoToClient(user);
  }
}
