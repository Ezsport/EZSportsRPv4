import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseSportDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AvatarUtils } from '../../utils/avatar.utils';

@Injectable()
export class SportsService {
  constructor(private prisma: PrismaService) { }

  async create(data: BaseSportDto) {
    const { base64, ...rest } = data;

    const sport = await this.prisma.baseSport.create({
      data: {
        ...rest,
        isActive: rest.isActive === 1,
        updatedAt: new Date()
      }
    });

    AvatarUtils.saveBase64(base64, 'sports', sport.id);

    return sport;
  }

  async findAll(active?: boolean) {
    const sports = await this.prisma.baseSport.findMany({
      where: active !== undefined
        ? { isActive: active }
        : undefined,
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(sports.map(async sport => ({
      ...sport,
      base64: AvatarUtils.getBase64('sports', sport.id) || undefined
    })));
  }

  async findOne(id: number) {
    const sport = await this.prisma.baseSport.findUnique({
      where: { id: Number(id) }
    });

    if (!sport) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...sport,
      base64: AvatarUtils.getBase64('sports', sport.id) || undefined
    };
  }

  async update(id: number, data: BaseSportDto) {
    try {
      const { base64, ...rest } = data;

      AvatarUtils.saveBase64(base64, 'sports', id);

      const sport = await this.prisma.baseSport.update({
        where: { id: Number(id) },
        data: {
          ...rest,
          isActive: rest.isActive === 1,
          updatedAt: new Date()
        }
      });

      return sport;
    } catch (error) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    // Validate id
    if (id === undefined || id === null || isNaN(id)) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id is a number and exists
      const sport = await this.prisma.baseSport.findUnique({
        where: { id: Number(id) }
      });

      if (!sport) {
        throw new NotFoundException(`Sport with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('sports', id);

      // Perform delete
      return await this.prisma.baseSport.delete({
        where: { id: Number(id) }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete sport error:', error);
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }
  }

  async removeMany(ids: number[]) {
    // Delete avatars for all sports being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('sports', id));

    return await this.prisma.baseSport.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: number]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return this.prisma.baseSport.update({
        where: { id: Number(id) },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
