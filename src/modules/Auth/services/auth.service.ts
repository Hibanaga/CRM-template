import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { User } from '../../../models/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CryptoService from './crypto.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
    private configService: ConfigService,
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

  async login(body: LoginAuthDto): Promise<any> {
    try {
      const payload = {
        email: body.email,
        sub: {
          username: body.username,
        },
      };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async profile(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'username'],
      });

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async single(name: string, value: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { [name]: value } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const userToDelete = await this.single('id', id);
      return this.userRepository.remove(userToDelete);
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
}
