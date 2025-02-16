import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateArticleDto from '../dto/create-article.dto';
import { ArticleEntity } from '../entities/article.entity';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articlesRepository: Repository<ArticleEntity>,
  ) {}
  saveArticles = (article: CreateArticleDto): Promise<ArticleEntity> => {
    const newArticle = this.articlesRepository.create(article);
    return this.articlesRepository.save(newArticle);
  };

  findAll = (): Promise<ArticleEntity[]> => {
    return this.articlesRepository.find();
  };

  findOne = (id: string | number): Promise<ArticleEntity> | HttpException => {
    const singleArticle = this.articlesRepository.findOne({
      where: { id: +id },
    });
    if (!singleArticle) {
      return new HttpException('Article Not Found', HttpStatus.NOT_FOUND);
    }
    return singleArticle;
  };

  updateArticle = async (id: number, body: Partial<ArticleEntity>) => {
    const singleArticle = await this.findOne(id);

    if (!singleArticle) {
      return new HttpException('Article Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedArticle = this.articlesRepository.update(id, body);
    return updatedArticle;
  };

  softDeleteArticle = async (id: number) => {
    const singleArticle = await this.findOne(id);
    if (!singleArticle) {
      return new HttpException('Article Not Found', HttpStatus.NOT_FOUND);
    }
    const deletedArticle = await this.updateArticle(id, { isDeleted: true });
  };
}
