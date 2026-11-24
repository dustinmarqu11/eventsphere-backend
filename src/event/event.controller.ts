import { Controller, Get, Post, Put, Patch, Delete, Param, Body, UseGuards, HttpCode, ParseIntPipe } from '@nestjs/common';
import { EventService } from './event.service.js';
import { CreateEventDto, UpdateEventDto } from './event.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  replace(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateEventDto) {
    return this.eventService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.remove(id);
  }
}