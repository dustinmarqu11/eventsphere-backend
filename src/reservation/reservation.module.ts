import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity.js';
import { User } from '../user/user.entity.js';
import { Event } from '../event/event.entity.js';
import { Notification } from '../notification/notification.entity.js';
import { ReservationService } from './reservation.service.js';
import { ReservationController } from './reservation.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Event, Notification])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}