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
import { IsBoolean, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString } from 'class-validator';
import { ArticleTag } from '@/features/article-tags/entity/article-tag.entity';
import { ArticleTranslate } from '@/features/article-translations/entity/article-translation.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  public id: string;

  @Column('int')
  @AutoMap()
  @IsNumber()
  public likes = 0;

  @Column({ default: false })
  @AutoMap()
  @IsBoolean()
  public isPublic: boolean;

  @CreateDateColumn()
  @AutoMap()
  public created: Date;

  @UpdateDateColumn()
  @AutoMap()
  public updated: Date;

  @Column({ nullable: false })
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  public imageUrl: string;

  @OneToOne(() => ArticleTranslate, { cascade: true })
  @JoinColumn()
  @AutoMap(() => ArticleTranslate)
  @IsObject()
  @IsNotEmptyObject()
  public translations: ArticleTranslate;

  @ManyToMany(() => ArticleTag, { cascade: ['insert'] })
  @JoinTable()
  @AutoMap(() => ArticleTag)
  @IsObject()
  public tags: ArticleTag[];
}
