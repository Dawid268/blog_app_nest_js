import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule, ArticleTagsModule, ArticleTranslationsModule } from './features';
import { SharedModule } from './shared/shared.module';
import { configService } from './config/config.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/exception/HttpException.filter';

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
    MulterModule.register({
      dest: './upload',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
