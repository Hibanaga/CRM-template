import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
