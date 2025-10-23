import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseCompetitionDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AvatarUtils } from 'src/utils/avatar.utils';

@Injectable()
export class BaseCompetitionsService {
  constructor(private prisma: PrismaService) { }

  async create(competitionDto: BaseCompetitionDto) {
    const { base64, ...rest } = competitionDto;

    const result = await (this.prisma as any).baseCompetition.create({
      data: {
        ...rest,
        status: rest.status ?? 'active'
      }
    });

    if (base64) {
      AvatarUtils.saveBase64(base64, 'competitions', result.id);
    }

    return result;
  }

  async findAll(active?: boolean) {
    const competitions = await this.prisma.baseCompetition.findMany({
      where: active !== undefined
        ? { status: active ? 'active' : 'inactive' }
        : undefined,
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(competitions.map(async competition => ({
      ...competition,
      base64: AvatarUtils.getBase64('competitions', competition.id.toString())
    })));
  }

  async findOne(id: string) {
    const competition = await (this.prisma as any).baseCompetition.findUnique({
      where: { id }
    });

    if (!competition) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }

    return {
      ...competition,
      base64: AvatarUtils.getBase64('competitions', id.toString())
    };
  }

  async update(id: string, competitionDto: BaseCompetitionDto) {
    const { base64, ...rest } = competitionDto;

    const result = await (this.prisma as any).baseCompetition.update({
      where: { id },
      data: {
        ...rest,
        status: rest.status ?? 'active',
        updatedAt: new Date()
      }
    });

    if (base64) {
      AvatarUtils.saveBase64(base64, 'competitions', id.toString());
    }

    return result;
  }

  async remove(id: string) {
    try {
      const competition = await (this.prisma as any).baseCompetition.findUnique({
        where: { id }
      });

      if (!competition) {
        throw new NotFoundException(`Competition with ID ${id} not found`);
      }

      AvatarUtils.deleteBase64('competitions', id);

      return await (this.prisma as any).baseCompetition.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Delete competition error:', error);
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    ids.forEach(id => AvatarUtils.deleteBase64('competitions', id));

    return await (this.prisma as any).baseCompetition.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0];
      return (this.prisma as any).baseCompetition.update({
        where: { id },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
