import { AdminService } from '@/admin/admin.service';
import { UserDocument } from '@/user/schema/user.schema';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign_in.in.dto';
import { SignInOutDto } from './dto/sign_in.out.dto';
import { IJwtPayload } from './interface/jwt_payload.interface';

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
    return user;
  }

  async signIn(user: UserDocument) {
    const payload: IJwtPayload = {
      sub: user._id.toString(),
      username: user.name,
      roles: user.roles,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return new SignInOutDto(user, accessToken);
  }
}
