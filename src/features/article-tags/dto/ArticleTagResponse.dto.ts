import { AutoMap } from '@automapper/classes';

export class ArticleTagResponse {
  @AutoMap()
  public id: string;

  @AutoMap()
  public namePl?: string;

  @AutoMap()
  public nameEn?: string;
}
