import { registerAs } from '@nestjs/config';

interface DatabaseConfigReturnType {
  type?: string;
  port?: string;
  host?: string;
  dbname?: string;
  username?: string;
  password?: string;
}

const DatabaseConfiguration = (): DatabaseConfigReturnType => ({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dbname: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

export default registerAs('dbConfig', DatabaseConfiguration);
