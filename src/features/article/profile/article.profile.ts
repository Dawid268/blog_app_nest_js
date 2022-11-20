import { Injectable } from '@nestjs/common';

import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  Converter,
  convertUsing,
  createMap,
  forMember,
  fromValue,
  Mapper,
  MappingProfile,
} from '@automapper/core';

import { ArticleTagRequest } from '@/features/article-tags/dto';
import { ArticleTranslationRequest } from '@/features/article-translations/dto';
import { ArticleFromDataRequest, ArticleRequest, ArticleResponse, ArticleSimpleResponse } from '../dto';
import { Article } from '../entities/article.entity';

export const formTagsToTagsConverter: Converter<string, ArticleTagRequest[]> = {
  convert(tags) {
    return [...JSON.parse(tags)];
  },
};

export const formArticleTranslationsToTranslationsConverter: Converter<string, ArticleTranslationRequest> = {
  convert(translations) {
    return JSON.parse(translations);
  },
};

@Injectable()
export class ArticleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        ArticleFromDataRequest,
        ArticleRequest,
        forMember(
          (dest) => dest.tags,
          convertUsing(formTagsToTagsConverter, (source) => source.tags)
        ),
        forMember(
          (dest) => dest.translations,
          convertUsing(formArticleTranslationsToTranslationsConverter, (source) => source.translations)
        )
      );
      createMap(
        mapper,
        ArticleRequest,
        Article,
        forMember((dest) => dest.likes, fromValue(0))
      );
      createMap(mapper, Article, ArticleResponse);
      createMap(mapper, Article, ArticleSimpleResponse);
    };
  }
}
