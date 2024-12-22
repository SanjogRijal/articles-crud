import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfiguration } from './config/swaggerConfiguration';

async function bootstrap() {
  const articlesCrudApp = await NestFactory.create(AppModule);
  articlesCrudApp.enableCors();
  articlesCrudApp.use(cookieParser());
  articlesCrudApp.use(csurf({ cookie: { sameSite: true } }));
  const configService = articlesCrudApp.get<ConfigService>(ConfigService);
  const document = SwaggerModule.createDocument(
    articlesCrudApp,
    SwaggerConfiguration(),
  );
  SwaggerModule.setup('/api/docs', articlesCrudApp, document);
  await articlesCrudApp.listen(configService.get('serverConfig.port'));
}
bootstrap();
