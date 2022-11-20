import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { ArticleTranslate } from '../entity/article-translation.entity';

export class ArticleTranslationRequest {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  public titlePl: ArticleTranslate['title_pl'];

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  public contentPl: ArticleTranslate['content_pl'];

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  @AutoMap()
  public titleEn?: ArticleTranslate['title_en'];

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  @AutoMap()
  public contentEn?: ArticleTranslate['content_en'];
}
