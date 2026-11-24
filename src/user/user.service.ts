import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import { UpdateUserDto } from './user.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepo.find();
    return users.map(({ passwordHash, ...rest }) => rest);
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { userId: id } });
    if (!user) throw new NotFoundException(`User #${id} not found.`);
    const { passwordHash, ...rest } = user;
    return rest;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { userId: id } });
    if (!user) throw new NotFoundException(`User #${id} not found.`);
    Object.assign(user, dto);
    const saved = await this.userRepo.save(user);
    const { passwordHash, ...rest } = saved;
    return rest;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { userId: id } });
    if (!user) throw new NotFoundException(`User #${id} not found.`);
    await this.userRepo.remove(user);
  }
}