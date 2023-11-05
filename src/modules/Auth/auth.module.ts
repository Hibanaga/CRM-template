import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/User';
import CryptoService from './services/crypto.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './authentication/strategy/local-strategy';
import { JwtStrategy } from './authentication/strategy/jwt-strategy';
import { RefreshJwtStrategy } from './authentication/strategy/refresh-token.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [
    AuthService,
    CryptoService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:
        '487109cf168d507226080741a26b209be5cdc120310f13a9637c09a39f5c81fe',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
