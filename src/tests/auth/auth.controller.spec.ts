import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../modules/Auth/auth.controller';
import { AuthService } from '../../modules/Auth/services/auth.service';
import { TypeORMPostgresqlTestingModule } from '../../config/tests';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/User';
import CryptoService from '../../modules/Auth/services/crypto.service';
import { LocalStrategy } from '../../modules/Auth/authentication/strategy/local-strategy';
import { JwtStrategy } from '../../modules/Auth/authentication/strategy/jwt-strategy';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../../app.module';
import { JWTConfiguration } from '../../config/authorization';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        AuthService,
        CryptoService,
        LocalStrategy,
        JwtStrategy,
        AuthService,
      ],
      imports: [
        AppModule,
        TypeORMPostgresqlTestingModule([User]),
        TypeOrmModule.forFeature([User]),
        JWTConfiguration,
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
