import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import * as csurf from 'csurf';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { SwaggerConfiguration } from './config/swaggerConfiguration';
import { ArticlesModule } from './modules/articles/articles.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

async function bootstrap() {
  const articlesCrudApp = await NestFactory.create(AppModule);
  articlesCrudApp.enableCors();
  articlesCrudApp.use(cookieParser());
  // articlesCrudApp.use(csurf({}));
  const configService = articlesCrudApp.get<ConfigService>(ConfigService);
  const document = SwaggerModule.createDocument(
    articlesCrudApp,
    SwaggerConfiguration(),
    {
      include: [AuthModule, UserModule, ArticlesModule],
    },
  );
  SwaggerModule.setup('/api/docs', articlesCrudApp, document);
  await articlesCrudApp.listen(configService.get('serverConfig.port'), () => {
    console.log(
      'Application Running On Port ' + configService.get('serverConfig.port'),
    );
  });
}
bootstrap();
