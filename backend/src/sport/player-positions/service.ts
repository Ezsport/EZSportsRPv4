import { Injectable, NotFoundException } from '@nestjs/common';
import { SportPlayerPositionDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlayerPositionService {
  constructor(private prisma: PrismaService) { }

  async create(playerPositionDto: SportPlayerPositionDto) {
    const playerPosition = await (this.prisma as any).sportPlayerPosition.create({
      data: playerPositionDto
    });

    return playerPosition;
  }

  async findAll(sportId?: number) {
    const playerPositions = await (this.prisma as any).sportPlayerPosition.findMany({
      where: sportId !== undefined ? { sportId } : undefined,
      orderBy: { ord: 'asc' }
    });

    return playerPositions;
  }

  async findOne(id: string) {
    const playerPosition = await (this.prisma as any).sportPlayerPosition.findUnique({
      where: { id }
    });

    if (!playerPosition) {
      throw new NotFoundException(`Player Position with ID ${id} not found`);
    }

    return playerPosition;
  }

  async update(id: string, updatePlayerPositionDto: SportPlayerPositionDto) {
    try {
      const playerPosition = await (this.prisma as any).sportPlayerPosition.update({
        where: { id },
        data: updatePlayerPositionDto
      });

      return playerPosition;
    } catch (error) {
      throw new NotFoundException(`Player Position with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const playerPosition = await (this.prisma as any).sportPlayerPosition.findUnique({
        where: { id }
      });

      if (!playerPosition) {
        throw new NotFoundException(`Player Position with ID ${id} not found`);
      }

      // Perform delete
      return await (this.prisma as any).sportPlayerPosition.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete player position error:', error);
      throw new NotFoundException(`Player Position with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    return await (this.prisma as any).sportPlayerPosition.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).sportPlayerPosition.update({
        where: { id },
        data: { name: undefined }, // Prisma requires at least one field to update
      });
    });

    return Promise.all(updatePromises);
  }
}
