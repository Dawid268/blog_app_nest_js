import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleTagRequest {
  @ApiProperty()
  @AutoMap()
  public id?: string;

  @ApiProperty()
  @AutoMap()
  public namePl: string;

  @ApiProperty()
  @AutoMap()
  public nameEn?: string;
}
