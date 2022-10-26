import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule, ArticleTagsModule, ArticleTranslationsModule } from './features';
import { SharedModule } from './shared/shared.module';
import { configService } from './config/config.service';

const featureModules = [ArticleModule, ArticleTranslationsModule, ArticleTagsModule];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
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
