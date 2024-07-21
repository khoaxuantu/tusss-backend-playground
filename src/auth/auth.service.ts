import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign_in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '@/user/schema/user.schema';
import { IJwtPayload } from './interface/jwt_payload.interface';
import { AdminService } from '@/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async validate(props: SignInDto): Promise<Omit<UserDocument, 'password'>> {
    const user = props.isAdmin
      ? await this.adminService.getOneByEmail(props.email)
      : await this.userService.getOneByEmail(props.email);
    if (user?.password != props.password) throw new UnauthorizedException();
    user.password = undefined;
    return user;
  }

  async signIn(user: UserDocument) {
    const payload: IJwtPayload = {
      sub: user._id.toString(),
      username: user.name,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
