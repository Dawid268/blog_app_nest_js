import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { DeleteResult } from 'typeorm';
import { Multer, diskStorage } from 'multer';
import { MapPipe } from '@automapper/nestjs';

import { ArticleService } from './article.service';
import { ArticleFromDataRequest, ArticleRequest, ArticleResponse, PaginatedArticleResponse } from './dto';
import { Article } from './entities/article.entity';
import { editFileName, imageFileFilter } from './utils/file.utils';
import { ArticleException, ArticleExceptionFilter } from './exceptions/articleCustomException.filter';
import { ErrorCodes } from '@shared/enums';
import { HttpExceptionFilter, ValidationPipeExceptionFilter } from '@shared/exception';

@ApiTags('articles')
@Controller('articles')
@UseFilters(new HttpExceptionFilter(), new ValidationPipeExceptionFilter(), new ArticleExceptionFilter())
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async createArticle(
    @UploadedFile() image: Multer.File,
    @Body(MapPipe(ArticleFromDataRequest, ArticleRequest)) articleRequestBody: ArticleRequest
  ): Promise<ArticleResponse> {
    if (!image) {
      throw new ArticleException(ErrorCodes.ARTICLE_FILE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.articleService.createArticle(articleRequestBody, image?.path);
  }

  @Get()
  public async findAllArticles(): Promise<PaginatedArticleResponse> {
    return this.articleService.findAllArticles();
  }

  @Get(':id')
  public async findOneArticle(@Param('id') id: Article['id']): Promise<ArticleResponse> {
    return this.articleService.findOneArticle(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async updateArticle(
    @Param('id') id: Article['id'],
    @UploadedFile() image: Multer.File,
    @Body(MapPipe(ArticleFromDataRequest, ArticleRequest)) articleRequestBody: ArticleRequest
  ): Promise<ArticleResponse> {
    return this.articleService.updateArticle(id, articleRequestBody, image?.path);
  }

  @Delete(':id')
  public async removeArticle(@Param('id') id: Article['id']): Promise<DeleteResult> {
    return this.articleService.removeArticle(id);
  }
}
