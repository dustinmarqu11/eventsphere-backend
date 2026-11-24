import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../user/user.entity.js';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notificationId: number;

  @Column('text')
  message: string;

  @CreateDateColumn()
  dateSent: Date;

  @Column({ length: 20, default: 'Sent' })
  status: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}