import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DB_ENTITIES } from './constants';

export const TypeOrmConfiguration = (): TypeOrmModuleOptions => ({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: DB_ENTITIES,
  synchronize: Boolean(process.env.DB_SYNCHRONIZE) ?? false,
});
