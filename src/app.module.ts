import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity.js';
import { Event } from './event/event.entity.js';
import { Reservation } from './reservation/reservation.entity.js';
import { Notification } from './notification/notification.entity.js';
import { SystemLog } from './system-log/system-log.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { EventModule } from './event/event.module.js';
import { ReservationModule } from './reservation/reservation.module.js';
import { NotificationModule } from './notification/notification.module.js';
import { SystemLogModule } from './system-log/system-log.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Event, Reservation, Notification, SystemLog],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    EventModule,
    ReservationModule,
    NotificationModule,
    SystemLogModule,
  ],
})
export class AppModule {}