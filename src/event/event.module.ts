import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity.js';
import { User } from '../user/user.entity.js';
import { EventService } from './event.service.js';
import { EventController } from './event.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User])],
  providers: [EventService],
  controllers: [EventController],
  exports: [TypeOrmModule],
})
export class EventModule {}