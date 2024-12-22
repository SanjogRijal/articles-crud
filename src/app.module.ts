import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import serverConfig from './config/serverConfig';
import dbConfig from './config/dbConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfiguration } from './config/typeOrmConfig';
import { UserModule } from './user/user.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
