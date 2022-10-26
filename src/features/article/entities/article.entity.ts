import { AutoMap } from '@automapper/classes';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { ArticleTag } from 'src/features/article-tags/entity/article-tag.entity';
import { ArticleTranslate } from 'src/features/article-translations/entity/article-translation.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  public id: string;

  @Column('int')
  @AutoMap()
  public likes = 0;

  @Column({ default: false })
  @AutoMap()
  public isPublic: boolean;

  @CreateDateColumn()
  @AutoMap()
  public created: Date;

  @UpdateDateColumn()
  @AutoMap()
  public updated: Date;

  @Column({ nullable: true })
  @AutoMap()
  public imageUrl: string;

  @OneToOne(() => ArticleTranslate, { cascade: true })
  @JoinColumn()
  @AutoMap(() => ArticleTranslate)
  public translations: ArticleTranslate;

  @ManyToMany(() => ArticleTag, { cascade: ['insert'] })
  @JoinTable()
  @AutoMap(() => ArticleTag)
  public tags: ArticleTag[];
}
