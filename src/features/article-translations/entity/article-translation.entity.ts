import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArticleTranslate {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'text' })
  @AutoMap()
  public title_pl: string;

  @Column('text')
  @AutoMap()
  public content_pl: string;

  @Column({ type: 'text', nullable: true })
  @AutoMap()
  public title_en: string;

  @Column({ type: 'text', nullable: true })
  @AutoMap()
  public content_en: string;
}
