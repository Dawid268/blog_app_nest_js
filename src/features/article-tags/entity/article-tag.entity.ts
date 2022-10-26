import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ArticleTag {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  public id: string;

  @Column({ type: 'text' })
  @AutoMap()
  public tagNamePl: string;

  @Column({ type: 'text', nullable: true })
  @AutoMap()
  public tagNameEn: string;

  @CreateDateColumn()
  @AutoMap()
  public created: Date;

  @UpdateDateColumn()
  @AutoMap()
  public updated: Date;
}
