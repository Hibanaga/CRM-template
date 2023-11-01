import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from '../../models/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(body: RegisterAuthDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: body });

      if (user) {
        return await this.userRepository.create(body);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async login(body: LoginAuthDto): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: body });
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
}
