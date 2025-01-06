import { Module } from '@nestjs/common';
import { ArticlesController } from './controller/articles.controller';
import { ArticlesService } from './service/articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
