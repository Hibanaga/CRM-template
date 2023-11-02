import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { User } from '../../../models/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CryptoService from './crypto.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterAuthDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: body.email },
      });

      if (user) {
        throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await this.cryptoService.hashPassword(
        body.password,
      );
      const newUser = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          ...body,
          password: hashedPassword,
        })
        .returning(['id', 'email', 'password'])
        .execute();

      return newUser.raw;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(body: LoginAuthDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: body.email },
      });

      if (!user) {
        throw new NotAcceptableException(
          'Cannot find user with this credentials',
        );
      }

      const passwordValidation = await this.cryptoService.matchPassword(
        body.password,
        user.password,
      );

      if (user && passwordValidation) {
        return user;
      }

      return null;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async single(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const userToDelete = await this.single(id);
      return await this.userRepository.remove(userToDelete);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async validate(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (
      user &&
      (await this.cryptoService.matchPassword(password, user.password))
    ) {
      const { password, ...otherParams } = user;
      return otherParams;
    }

    return null;
  }

  async refreshToken(user: User) {
    const payload = {
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
