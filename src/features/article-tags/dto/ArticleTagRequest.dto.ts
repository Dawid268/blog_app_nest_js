import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';

export class ArticleTagRequest {
  @ApiProperty()
  @AutoMap()
  public namePl?: string;

  @ApiProperty()
  @AutoMap()
  public nameEn?: string;
}
