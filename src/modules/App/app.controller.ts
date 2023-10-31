import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Seeder } from '../../types/Seeder';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async entry(): Promise<string> {
    return this.appService.entry();
  }

  @Post('/seed')
  async seed(): Promise<Seeder> {
    return await this.appService.seed();
  }
}
