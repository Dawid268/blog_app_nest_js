import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

import { ArticleTagRequest } from '@features/article-tags/dto';
import { ArticleTranslationRequest } from '@features/article-translations/dto';


export class ArticleRequest {
  @ApiProperty()
  @AutoMap(() => ArticleTagRequest)
  public tags: ArticleTagRequest[];

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap(() => ArticleTranslationRequest)
  public translations: ArticleTranslationRequest;

  constructor(tags: ArticleTagRequest[], translations: ArticleTranslationRequest) {
    (this.tags = tags), (this.translations = translations);
  }
}
