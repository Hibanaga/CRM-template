import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Market } from './Market';

@Entity({ name: 'languages' })
export class Language {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'language_code', type: 'varchar' })
  language_code: string;

  @Column({ name: 'default', type: 'boolean' })
  default: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Market, (market) => market.id)
  market: Market;
}
