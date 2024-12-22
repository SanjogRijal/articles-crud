import { registerAs } from '@nestjs/config';

interface ServerConfigurationType {
  port?: string;
  host?: string;
}

const ServerConfiguration = (): ServerConfigurationType => ({
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT,
});

export default registerAs('serverConfig', ServerConfiguration);
