import { Module } from '@nestjs/common';

import { ArticleTranslationsService } from './article-translations.service';
import { ArticleTranslationsController } from './article-translations.controller';
import { ArticleTagProfile } from './profile/article-translation.profile';

@Module({
  controllers: [ArticleTranslationsController],
  providers: [ArticleTranslationsService, ArticleTagProfile],
})
export class ArticleTranslationsModule {}
