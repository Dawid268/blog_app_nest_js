import { Injectable } from '@nestjs/common';

import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile } from '@automapper/core';

import { ArticleTranslate } from '../entity/article-translation.entity';
import { ArticleTranslationRequest, ArticleTranslationResponse } from '../dto';

@Injectable()
export class ArticleTagProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        ArticleTranslate,
        ArticleTranslationResponse,
        forMember(
          (dest) => dest.contentPl,
          mapFrom((source) => source.content_pl)
        ),
        forMember(
          (dest) => dest.contentEn,
          mapFrom((source) => source.content_en)
        ),
        forMember(
          (dest) => dest.titlePl,
          mapFrom((source) => source.title_pl)
        ),
        forMember(
          (dest) => dest.titleEn,
          mapFrom((source) => source.content_en)
        )
      );
      createMap(
        mapper,
        ArticleTranslationRequest,
        ArticleTranslate,
        forMember((dest) => dest.id, ignore()),
        forMember(
          (dest) => dest.content_pl,
          mapFrom((source) => source.contentPl)
        ),
        forMember(
          (dest) => dest.content_en,
          mapFrom((source) => source.contentEn)
        ),
        forMember(
          (dest) => dest.title_en,
          mapFrom((source) => source.titleEn)
        ),
        forMember(
          (dest) => dest.title_pl,
          mapFrom((source) => source.titlePl)
        )
      );
    };
  }
}
