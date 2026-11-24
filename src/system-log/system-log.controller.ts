import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemLog } from './system-log.entity.js';
import { User } from '../user/user.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('system-logs')
export class SystemLogController {
  constructor(
    @InjectRepository(SystemLog)
    private logRepo: Repository<SystemLog>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  @Get()
  findAll() {
    return this.logRepo.find({ relations: { admin: true } });
  }

  @Post()
  async create(@Body() body: { adminId: number; actionPerformed: string }) {
    const admin = await this.userRepo.findOne({ where: { userId: body.adminId } });
    const log = this.logRepo.create({
      actionPerformed: body.actionPerformed,
      admin: admin || undefined,
    });
    return this.logRepo.save(log);
  }
}