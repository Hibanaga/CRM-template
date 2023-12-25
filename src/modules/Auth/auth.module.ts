import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/User';
import CryptoService from './services/crypto.service';
import { LocalStrategy } from './authentication/strategy/local-strategy';
import { JwtStrategy } from './authentication/strategy/jwt-strategy';
import { JWTConfiguration } from '../../config/authorization';

@Module({
  providers: [AuthService, CryptoService, LocalStrategy, JwtStrategy],
  imports: [TypeOrmModule.forFeature([User]), JWTConfiguration],
  controllers: [AuthController],
})
export class AuthModule {}
