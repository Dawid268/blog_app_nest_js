import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

import { ArticleTagRequest } from 'src/features/article-tags/dto';
import { ArticleTranslationRequest } from 'src/features/article-translations/dto';

export class ArticleRequest {
  @ApiProperty()
  @IsNotEmpty()
  @AutoMap(() => ArticleTagRequest)
  public tags: ArticleTagRequest[];

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap(() => ArticleTranslationRequest)
  public translations: ArticleTranslationRequest;
}
