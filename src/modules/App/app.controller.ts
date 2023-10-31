import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Language } from '../../models/Language';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async entry(): Promise<string> {
    return this.appService.entry();
  }

  @Post('/seed')
  async seed(): Promise<Language[]> {
    return this.appService.seed();
  }
}
