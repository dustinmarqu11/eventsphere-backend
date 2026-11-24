import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemLog } from './system-log.entity.js';
import { User } from '../user/user.entity.js';
import { SystemLogController } from './system-log.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SystemLog, User])],
  controllers: [SystemLogController],
})
export class SystemLogModule {}