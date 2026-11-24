import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpCode, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service.js';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationController {
  constructor(private readonly resService: ReservationService) {}

  @Get()
  findAll() {
    return this.resService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.resService.findByUser(userId);
  }

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.resService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReservationDto) {
    return this.resService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resService.remove(id);
  }
}