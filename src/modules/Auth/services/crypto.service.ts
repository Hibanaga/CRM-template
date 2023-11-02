import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class CryptoService {
  constructor(private configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 4);
  }

  async matchPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
