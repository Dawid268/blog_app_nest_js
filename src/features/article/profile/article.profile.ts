import { Injectable } from '@nestjs/common';

import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, fromValue, Mapper, MappingProfile } from '@automapper/core';

import { ArticleRequest, ArticleResponse, ArticleSimpleResponse } from '../dto';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
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
