import { Module } from '@nestjs/common';
import { AppController } from './modules/App/app.controller';
import { AppService } from './modules/App/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormCliConfig from '../typeorm-cli.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => typeormCliConfig.options,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
