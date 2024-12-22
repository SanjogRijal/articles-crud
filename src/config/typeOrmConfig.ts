import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfiguration = (): TypeOrmModuleOptions => ({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: Boolean(process.env.DB_SYNCHRONIZE) ?? false,
});
