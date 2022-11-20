import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ArticleFromDataRequest {
  @ApiProperty()
  @IsString()
  @AutoMap()
  public tags: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  public translations: string;
}
