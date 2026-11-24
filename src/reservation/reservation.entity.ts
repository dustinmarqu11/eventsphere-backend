import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../user/user.entity.js';
import { Event } from '../event/event.entity.js';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  reservationId: number;

  @Column('int')
  numberOfTickets: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ length: 20, default: 'Confirmed' })
  status: string;

  @CreateDateColumn()
  reservationDate: Date;

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @ManyToOne(() => Event, (event) => event.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event: Relation<Event>;
}