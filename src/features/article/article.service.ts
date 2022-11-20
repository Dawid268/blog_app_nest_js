import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import * as fileSystem from 'fs';

import { ArticleRequest, ArticleResponse, PaginatedArticleResponse } from './dto';
import { Article } from './entities/article.entity';
import { ArticleException } from './exceptions/articleCustomException.filter';
import { ErrorCodes } from '@/shared/enums';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    @InjectMapper() private readonly articleClassMapper: Mapper
  ) {}

  public async createArticle(articleRequestBody: ArticleRequest, imageUrl: string): Promise<ArticleResponse> {
    try {
      const newArticle = this.articleClassMapper.map(articleRequestBody, ArticleRequest, Article);
      newArticle.imageUrl = imageUrl;
      const article = await this.articleRepository.save(newArticle);
      return this.articleClassMapper.map(article, Article, ArticleResponse);
    } catch (e) {
      throw new ArticleException(e, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  public async findAllArticles(skip = 0, take = 10): Promise<PaginatedArticleResponse> {
    const [articles, total] = await this.articleRepository.findAndCount({
      relations: { translations: true },
      order: { updated: 'ASC' },
      skip,
      take,
    });
    const articlesResponse = this.articleClassMapper.mapArray(articles, Article, ArticleResponse);
    return {
      articles: articlesResponse,
      total,
    };
  }

  public async findOneArticle(id: Article['id']): Promise<ArticleResponse> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { tags: true, translations: true },
    });

    if (!article) {
      throw new ArticleException(ErrorCodes.ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.articleClassMapper.map(article, Article, ArticleResponse);
  }

  public async updateArticle(
    id: Article['id'],
    articleRequestBody: ArticleRequest,
    imageUrl: string
  ): Promise<ArticleResponse> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { tags: true, translations: true },
    });

    if (!article) {
      throw new ArticleException(ErrorCodes.ARTICLE_UPDATE, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (imageUrl) {
      try {
        fileSystem.unlinkSync(article.imageUrl);
      } catch (error) {
        throw new ArticleException(ErrorCodes.ARTICLE_FILE_DELETE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    const { tags, translations } = this.articleClassMapper.map(articleRequestBody, ArticleRequest, Article);
    Object.assign(article, { tags, translations, id, imageUrl: imageUrl || article.imageUrl });

    return this.articleClassMapper.mapAsync(await this.articleRepository.save(article), Article, ArticleResponse);
  }

  public async removeArticle(id: Article['id']): Promise<DeleteResult> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { tags: true, translations: true },
    });

    if (!article) {
      throw new ArticleException(ErrorCodes.ARTICLE_UPDATE, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
      fileSystem.unlinkSync(article.imageUrl);
      return await this.articleRepository.delete(id);
    } catch (error) {
      throw new ArticleException(ErrorCodes.ARTICLE_DELETE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
