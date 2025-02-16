import { Injectable } from '@nestjs/common';
import CreateArticleDto from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticlesRepository } from '../repository/articles.repository';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}
  create(createArticleDto: CreateArticleDto) {
    return this.articlesRepository.saveArticles(createArticleDto);
  }

  findAll() {
    return this.articlesRepository.findAll();
  }

  findOne(id: number) {
    return this.articlesRepository.findOne(id);
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
