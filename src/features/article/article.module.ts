import { Module } from '@nestjs/common';

import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleProfile } from './profile/article.profile';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleProfile],
})
export class ArticleModule {}
