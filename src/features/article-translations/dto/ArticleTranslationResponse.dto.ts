import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { ArticleTranslate } from '../entity/article-translation.entity';

export class ArticleTranslationResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  public titlePl: ArticleTranslate['title_pl'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  public contentPl: ArticleTranslate['content_pl'];

  @ApiProperty()
  @IsString()
  @IsOptional()
  @AutoMap()
  public titleEn: ArticleTranslate['title_en'];

  @ApiProperty()
  @IsString()
  @IsOptional()
  @AutoMap()
  public contentEn: ArticleTranslate['content_en'];
}
