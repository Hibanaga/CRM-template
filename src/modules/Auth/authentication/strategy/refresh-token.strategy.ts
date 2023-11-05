import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey:
        '487109cf168d507226080741a26b209be5cdc120310f13a9637c09a39f5c81fe',
    });
  }

  async validate(payload: any) {
    console.log(
      `[RefreshToken Strategy] validate: payload=${JSON.stringify(payload)}`,
    );
    return { userId: payload.sub, email: payload.email };
  }
}
