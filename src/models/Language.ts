import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'languages' })
export class Language {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ name: 'language_code', type: 'varchar', unique: true })
  language_code: string;

  @Column({ name: 'default', type: 'boolean' })
  default?: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
