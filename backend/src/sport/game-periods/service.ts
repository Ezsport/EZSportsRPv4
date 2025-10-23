import { Injectable, NotFoundException } from '@nestjs/common';
import { SportGamePeriodDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GamePeriodService {
  constructor(private prisma: PrismaService) { }

  async create(gamePeriodDto: SportGamePeriodDto) {
    const gamePeriod = await (this.prisma as any).sportGamePeriod.create({
      data: gamePeriodDto
    });

    return gamePeriod;
  }

  async findAll(sportId?: number) {
    const gamePeriods = await (this.prisma as any).sportGamePeriod.findMany({
      where: sportId !== undefined ? { sportId } : undefined,
      orderBy: { ord: 'asc' }
    });

    return gamePeriods;
  }

  async findOne(id: string) {
    const gamePeriod = await (this.prisma as any).sportGamePeriod.findUnique({
      where: { id }
    });

    if (!gamePeriod) {
      throw new NotFoundException(`Game Period with ID ${id} not found`);
    }

    return gamePeriod;
  }

  async update(id: string, updateGamePeriodDto: SportGamePeriodDto) {
    try {
      const gamePeriod = await (this.prisma as any).sportGamePeriod.update({
        where: { id },
        data: updateGamePeriodDto
      });

      return gamePeriod;
    } catch (error) {
      throw new NotFoundException(`Game Period with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const gamePeriod = await (this.prisma as any).sportGamePeriod.findUnique({
        where: { id }
      });

      if (!gamePeriod) {
        throw new NotFoundException(`Game Period with ID ${id} not found`);
      }

      // Perform delete
      return await (this.prisma as any).sportGamePeriod.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete game period error:', error);
      throw new NotFoundException(`Game Period with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    return await (this.prisma as any).sportGamePeriod.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).sportGamePeriod.update({
        where: { id },
        data: { name: undefined }, // Prisma requires at least one field to update
      });
    });

    return Promise.all(updatePromises);
  }
}
