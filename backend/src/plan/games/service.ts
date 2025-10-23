import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanGameDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanGamesService {
  constructor(private prisma: PrismaService) { }

  async create(gameDto: PlanGameDto) {
    const game = await (this.prisma as any).planGame.create({
      data: {
        ...gameDto,
        status: gameDto.status ?? 'scheduled',
        isScrimmage: gameDto.isScrimmage ?? 0
      }
    });

    return game;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const games = await (this.prisma as any).planGame.findMany({
      skip,
      take,
      cursor: cursor ? { id: cursor } : undefined,
      where,
      orderBy: orderBy ?? { startDatetime: 'asc' }
    });

    return Promise.all(games.map(async game => ({
      ...game,
    })));
  }

  async findOne(id: string) {
    const game = await (this.prisma as any).planGame.findUnique({
      where: { id }
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return game;
  }

  async update(id: string, gameDto: PlanGameDto) {
    try {
      const game = await (this.prisma as any).planGame.update({
        where: { id },
        data: gameDto
      });

      return game;
    } catch (error) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const game = await (this.prisma as any).planGame.findUnique({
        where: { id }
      });

      if (!game) {
        throw new NotFoundException(`Game with ID ${id} not found`);
      }

      return await (this.prisma as any).planGame.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Delete game error:', error);
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    return await (this.prisma as any).planGame.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).planGame.update({
        where: { id },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
