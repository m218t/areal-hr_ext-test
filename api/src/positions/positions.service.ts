import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const position = this.positionsRepository.create(createPositionDto);
    return await this.positionsRepository.save(position);
  }

  async findAll(): Promise<Position[]> {
    return await this.positionsRepository.find({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Position> {
    const position = await this.positionsRepository.findOne({
      where: { id, deletedAt: IsNull() }
    });
    
    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    
    return position;
  }

  async update(id: string, updatePositionDto: UpdatePositionDto): Promise<Position> {
    const position = await this.findOne(id);
    
    Object.assign(position, updatePositionDto);
    position.updatedAt = new Date();
    
    return await this.positionsRepository.save(position);
  }

  async remove(id: string): Promise<void> {
    const position = await this.findOne(id);
    position.deletedAt = new Date();
    await this.positionsRepository.save(position);
  }
}