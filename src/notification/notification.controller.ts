import { Controller, Get, Patch, Delete, Param, UseGuards, HttpCode, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(
    @InjectRepository(Notification)
    private notifRepo: Repository<Notification>,
  ) {}

  @Get()
  findAll() {
    return this.notifRepo.find({ relations: { user: true } });
  }

  @Patch(':id/read')
  async markRead(@Param('id', ParseIntPipe) id: number) {
    await this.notifRepo.update(id, { status: 'Read' });
    return this.notifRepo.findOne({ where: { notificationId: id } });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.notifRepo.delete(id);
  }
}