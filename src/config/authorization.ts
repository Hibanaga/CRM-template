import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const JWTConfiguration = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
    },
  }),
  inject: [ConfigService],
});
