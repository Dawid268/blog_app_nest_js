import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

import { ArticleTagResponse } from 'src/features/article-tags/dto';
import { ArticleSimpleResponse } from '.';

export class ArticleResponse extends ArticleSimpleResponse {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @AutoMap()
  public likes: number;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  @AutoMap(() => ArticleTagResponse)
  public tags: ArticleTagResponse;

  @ApiProperty()
  @IsString()
  @AutoMap()
  public imageUrl: string;
}
