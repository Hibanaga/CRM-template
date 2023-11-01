import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMPostgresqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: (process.env.POSTGRES_PORT || 5432) as number,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
    entities: [...entities],
    synchronize: false,
  });
