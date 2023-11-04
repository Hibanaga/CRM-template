import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        '487109cf168d507226080741a26b209be5cdc120310f13a9637c09a39f5c81fe',
    });
  }

  async validate(payload: any) {
    return { email: payload.email };
  }
}
