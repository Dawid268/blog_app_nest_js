import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty, IsBoolean, IsObject } from 'class-validator';

import { ArticleTranslationResponse } from 'src/features/article-translations/dto';

export class ArticleSimpleResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  public id: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @AutoMap()
  public isPublic: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  public created: Date;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  public updated: Date;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  @AutoMap(() => ArticleTranslationResponse)
  public translations: ArticleTranslationResponse;
}
