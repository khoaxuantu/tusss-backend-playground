import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { IStrategyOptionsWithRequest, Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/sign_in.in.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true } as IStrategyOptionsWithRequest);
  }

  async validate(req: Request, email: string, password: string) {
    const data: SignInDto = req.body;
    const user = await this.authService.validate({ email, password, isAdmin: data.isAdmin });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
