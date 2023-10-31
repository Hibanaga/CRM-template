import { Injectable } from '@nestjs/common';
import { Language } from '../../models/Language';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    private configService: ConfigService,
  ) {}

  async entry(): Promise<string> {
    return 'Application succesfully run on http://localhost:8080';
  }

  async seed(): Promise<Language[]> {
    return []
  }
}
