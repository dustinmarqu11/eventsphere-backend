import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity.js';
import { User } from '../user/user.entity.js';
import { Event } from '../event/event.entity.js';
import { Notification } from '../notification/notification.entity.js';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto.js';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private resRepo: Repository<Reservation>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
    @InjectRepository(Notification)
    private notifRepo: Repository<Notification>,
  ) {}

  findAll() {
    return this.resRepo.find({ relations: { user: true, event: true } });
  }

  async findOne(id: number) {
    const res = await this.resRepo.findOne({
      where: { reservationId: id },
      relations: { user: true, event: true },
    });
    if (!res) throw new NotFoundException(`Reservation #${id} not found.`);
    return res;
  }

  findByUser(userId: number) {
    return this.resRepo.find({
      where: { user: { userId } },
      relations: { event: true },
    });
  }

  async create(dto: CreateReservationDto) {
    const user = await this.userRepo.findOne({ where: { userId: dto.userId } });
    if (!user) throw new NotFoundException(`User #${dto.userId} not found.`);

    const event = await this.eventRepo.findOne({ where: { eventId: dto.eventId } });
    if (!event) throw new NotFoundException(`Event #${dto.eventId} not found.`);

    if (dto.numberOfTickets > event.capacity) {
      throw new ConflictException('Requested tickets exceed available event capacity.');
    }

    const totalAmount = Number(event.ticketPrice) * dto.numberOfTickets;

    const reservation = this.resRepo.create({
      user,
      event,
      numberOfTickets: dto.numberOfTickets,
      totalAmount,
      status: 'Confirmed',
    });

    const saved = await this.resRepo.save(reservation);

    // Automatically log an email notification record
    const notif = this.notifRepo.create({
      user,
      message: `Your reservation (#${saved.reservationId}) for ${event.title} is confirmed.`,
      status: 'Sent',
    });
    await this.notifRepo.save(notif);

    return saved;
  }

  async update(id: number, dto: UpdateReservationDto) {
    const res = await this.findOne(id);
    if (dto.numberOfTickets) {
      res.numberOfTickets = dto.numberOfTickets;
      res.totalAmount = Number(res.event.ticketPrice) * dto.numberOfTickets;
    }
    if (dto.status) res.status = dto.status;
    return this.resRepo.save(res);
  }

  async remove(id: number) {
    const res = await this.findOne(id);
    await this.resRepo.remove(res);
  }
}