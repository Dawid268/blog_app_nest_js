import { Module } from '@nestjs/common';

import { ArticleTagsService } from './article-tags.service';
import { ArticleTagsController } from './article-tags.controller';
import { ArticleTagProfile } from './profile/article-tag.profile';

@Module({
  controllers: [ArticleTagsController],
  providers: [ArticleTagsService, ArticleTagProfile],
})
export class ArticleTagsModule {}
