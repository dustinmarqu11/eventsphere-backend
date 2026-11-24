import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../user/user.entity.js';
import { Reservation } from '../reservation/reservation.entity.js';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column({ length: 150 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('datetime')
  eventDate: Date;

  @Column({ length: 200 })
  location: string;

  @Column('decimal', { precision: 10, scale: 2 })
  ticketPrice: number;

  @Column('int')
  capacity: number;

  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizerId' })
  organizer: Relation<User>;

  @OneToMany(() => Reservation, (reservation) => reservation.event)
  reservations: Relation<Reservation[]>;
}