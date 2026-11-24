import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../user/user.entity.js';

@Entity()
export class SystemLog {
  @PrimaryGeneratedColumn()
  logId: number;

  @Column({ length: 255 })
  actionPerformed: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'adminId' })
  admin: Relation<User>;
}