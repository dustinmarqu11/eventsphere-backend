import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { Event } from '../event/event.entity.js';
import { Reservation } from '../reservation/reservation.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ length: 20, default: 'Attendee' })
  userRole: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Relation<Event[]>;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Relation<Reservation[]>;
}