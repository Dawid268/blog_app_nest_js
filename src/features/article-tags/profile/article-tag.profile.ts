import { Injectable } from '@nestjs/common';

import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile } from '@automapper/core';

import { ArticleTagRequest, ArticleTagResponse } from '../dto';
import { ArticleTag } from '../entity/article-tag.entity';
import { Lang } from '@/shared/enums';

export const languageMapper = (articleTag: ArticleTag, language: string): string => {
  return !language ? articleTag.tagNamePl : language === Lang.PL ? articleTag.tagNamePl : articleTag.tagNameEn;
};

@Injectable()
export class ArticleTagProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        ArticleTagRequest,
        ArticleTag,
        forMember((dest) => dest.created, ignore()),
        forMember((dest) => dest.updated, ignore()),
        forMember(
          (dest) => dest.tagNamePl,
          mapFrom((source) => source.namePl)
        ),
        forMember(
          (dest) => dest.tagNameEn,
          mapFrom((source) => source.nameEn)
        )
      );
      createMap(
        mapper,
        ArticleTag,
        ArticleTagResponse,
        forMember(
          (dest) => dest.namePl,
          mapFrom((source) => source.tagNamePl)
        ),
        forMember(
          (dest) => dest.nameEn,
          mapFrom((source) => source.tagNameEn)
        )
      );
    };
  }
}
