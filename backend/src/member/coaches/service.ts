import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberCoachDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CoachService {
  constructor(private prisma: PrismaService) { }

  async create(coachDto: MemberCoachDto) {
    const { base64, ...createData } = coachDto;

    const coach = await (this.prisma as any).memberCoache.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    AvatarUtils.saveBase64(base64, 'coaches', coach.id);

    return coach;
  }

  async findAll(status?: string) {
    const coaches = await (this.prisma as any).memberCoache.findMany({
      where: status !== undefined ? { status } : undefined,
      orderBy: { personId: 'asc' }
    });

    // Attach avatars
    return Promise.all(coaches.map(async coach => ({
      ...coach,
      base64: await AvatarUtils.getBase64('coaches', coach.id) || undefined
    })));
  }

  async findOne(id: string) {
    const coach = await (this.prisma as any).memberCoache.findUnique({
      where: { id }
    });

    if (!coach) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...coach,
      base64: await AvatarUtils.getBase64('coaches', coach.id) || undefined
    };
  }

  async update(id: string, updateCoachDto: MemberCoachDto) {
    try {
      const { base64, ...updateData } = updateCoachDto;

      if (base64) {
        AvatarUtils.saveBase64(base64, 'coaches', id);
      } else if (base64 === null) {
        AvatarUtils.deleteBase64('coaches', id);
      }

      const coach = await (this.prisma as any).memberCoache.update({
        where: { id },
        data: updateData
      });

      return coach;
    } catch (error) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const coach = await (this.prisma as any).memberCoache.findUnique({
        where: { id }
      });

      if (!coach) {
        throw new NotFoundException(`Coach with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('coaches', id);

      // Perform delete
      return await (this.prisma as any).memberCoache.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete coach error:', error);
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all coaches being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('coaches', id));

    return await (this.prisma as any).memberCoache.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).memberCoache.update({
        where: { id },
        data: { ord }, // Update the order
      });
    });

    return Promise.all(updatePromises);
  }
}
