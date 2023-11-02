import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../../models/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '',
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.authService.login(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
