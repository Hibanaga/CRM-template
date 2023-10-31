import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

function baseFolder(): string {
  const regex = /common+(\/|\\)+config/gi;
  return __dirname.replace(regex, '');
}

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  logging: configService.get<boolean>('POSTGRES_LOGGING'),
  entities: [baseFolder() + '/src/models/**/*{.ts,.js}'],
  migrations: [baseFolder() + '/src/database/migrations/**/*{.ts,.js}'],
});
