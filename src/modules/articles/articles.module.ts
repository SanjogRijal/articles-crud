import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './controller/articles.controller';
import { ArticleEntity } from './entities/article.entity';
import { ArticlesRepository } from './repository/articles.repository';
import { ArticlesService } from './service/articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
})
export class ArticlesModule {}
