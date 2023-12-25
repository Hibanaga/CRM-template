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
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;
  let service: AuthService;
  let repository: Repository<User>;

  const newUser = {
    email: 'test@gmail.com',
    password: '1234',
    username: null,
  };

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
    service = module.get<AuthService>(AuthService);

    app = module.createNestApplication();
    repository = module.get('UserRepository');

    await app.init();
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM users;`);
  });

  afterAll(() => {
    app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be called register method', async () => {
    const user = await controller.register(newUser);
    expect(user['email']).toBe(newUser.email);
    expect(!!user['accessToken']).toBeTruthy();
  });

  it('should be called login method', async () => {
    const user = await controller.register(newUser);
    const res = await controller.login({
      email: user.email,
      password: user.password,
      username: user.username,
    });

    expect(!!res?.accessToken).toBeTruthy();
  });
});
