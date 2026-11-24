import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity.js';
import { User } from '../user/user.entity.js';
import { CreateEventDto, UpdateEventDto } from './event.dto.js';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

findAll() {
    return this.eventRepo.find({ relations: { organizer: true } });
  }

  async findOne(id: number) {
    const event = await this.eventRepo.findOne({
      where: { eventId: id },
      relations: { organizer: true },
    });
    if (!event) throw new NotFoundException(`Event #${id} not found.`);
    return event;
  }

  async create(dto: CreateEventDto) {
    const organizer = await this.userRepo.findOne({ where: { userId: dto.organizerId } });
    if (!organizer) throw new NotFoundException(`Organizer #${dto.organizerId} not found.`);

    const event = this.eventRepo.create({
      ...dto,
      eventDate: new Date(dto.eventDate),
      organizer,
    });
    return this.eventRepo.save(event);
  }

  async update(id: number, dto: UpdateEventDto) {
    const event = await this.findOne(id);
    Object.assign(event, dto);
    if (dto.eventDate) event.eventDate = new Date(dto.eventDate);
    return this.eventRepo.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    await this.eventRepo.remove(event);
  }
}