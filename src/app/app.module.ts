import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from 'src/modules/articles/articles.module';
import dbConfig from '../config/dbConfig';
import serverConfig from '../config/serverConfig';
import { TypeOrmConfiguration } from '../config/typeOrmConfig';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [serverConfig, dbConfig],
    }),
    TypeOrmModule.forRoot(TypeOrmConfiguration()),
    UserModule,
    AuthModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
