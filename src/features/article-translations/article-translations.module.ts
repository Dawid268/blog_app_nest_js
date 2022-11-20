import { Module } from '@nestjs/common';

import { ArticleTranslationsService } from './article-translations.service';
import { ArticleTranslationsController } from './article-translations.controller';
import { ArticleTranslationProfile } from './profile/article-translation.profile';

@Module({
  controllers: [ArticleTranslationsController],
  providers: [ArticleTranslationsService, ArticleTranslationProfile],
})
export class ArticleTranslationsModule {}
