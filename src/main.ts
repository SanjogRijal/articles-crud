import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const articlesCrudApp = await NestFactory.create(AppModule);
  articlesCrudApp.enableCors();
  articlesCrudApp.use(cookieParser());
  articlesCrudApp.use(csurf({ cookie: { sameSite: true } }));
  const configService = articlesCrudApp.get<ConfigService>(ConfigService);
  await articlesCrudApp.listen(configService.get('serverConfig.port'));
}
bootstrap();
