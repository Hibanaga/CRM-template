import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Language } from './Language';

@Entity({ name: 'markets' })
export class Market {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'slug', type: 'varchar' })
  slug: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Language, (language) => language.id, {
    onDelete: 'CASCADE',
  })
  language_id: string;
}
