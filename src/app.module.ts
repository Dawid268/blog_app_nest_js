import { Module } from '@nestjs/common';

import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule, ArticleTagsModule, ArticleTranslationsModule } from './features';
import { SharedModule } from './shared/shared.module';

const featureModules = [ArticleModule, ArticleTranslationsModule, ArticleTagsModule];

@Module({
  imports: [
    ...featureModules,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
