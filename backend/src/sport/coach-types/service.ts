import { Injectable, NotFoundException } from '@nestjs/common';
import { SportCoachTypeDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';

@Injectable()
export class CoachTypeService {
  constructor(private prisma: PrismaService) { }

  async create(coachTypeDto: SportCoachTypeDto) {
    const { base64, ...createData } = coachTypeDto;

    const coachType = await (this.prisma as any).sportCoachType.create({
      data: {
        ...createData,
        name: createData.name,
        abbr: createData.abbr,
        color: createData.color,
        note: createData.note,
        isActive: createData.isActive ?? true
      }
    });

    AvatarUtils.saveBase64(base64, 'coach-types', coachType.id);

    return coachType;
  }

  async findAll(active?: boolean) {
    const coachTypes = await (this.prisma as any).sportCoachType.findMany({
      where: active !== undefined
        ? { isActive: active }
        : undefined,
      orderBy: { name: 'asc' }
    });

    // Attach avatars
    return Promise.all(coachTypes.map(async coachType => ({
      ...coachType,
      base64: await AvatarUtils.getBase64('coach-types', coachType.id) || undefined
    })));
  }

  async findOne(id: string) {
    const coachType = await (this.prisma as any).sportCoachType.findUnique({
      where: { id }
    });

    if (!coachType) {
      throw new NotFoundException(`Coach Type with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...coachType,
      base64: await AvatarUtils.getBase64('coach-types', coachType.id) || undefined
    };
  }

  async update(id: string, updateCoachTypeDto: SportCoachTypeDto) {
    try {
      const { base64, ...updateData } = updateCoachTypeDto;

      if (base64) {
        AvatarUtils.saveBase64(base64, 'coach-types', id);
      } else if (base64 === null) {
        AvatarUtils.deleteBase64('coach-types', id);
      }

      const coachType = await (this.prisma as any).sportCoachType.update({
        where: { id },
        data: updateData
      });

      return coachType;
    } catch (error) {
      throw new NotFoundException(`Coach Type with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const coachType = await (this.prisma as any).sportCoachType.findUnique({
        where: { id }
      });

      if (!coachType) {
        throw new NotFoundException(`Coach Type with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('coach-types', id);

      // Perform delete
      return await (this.prisma as any).sportCoachType.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete coach type error:', error);
      throw new NotFoundException(`Coach Type with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all coach types being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('coach-types', id));

    return await (this.prisma as any).sportCoachType.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).sportCoachType.update({
        where: { id },
        data: { name: undefined }, // Prisma requires at least one field to update
      });
    });

    return Promise.all(updatePromises);
  }

  async findAllBySportId(sportId: string) {
    const rows = await (this.prisma as any).sportCoachType.findMany({
      where: { sportId }
    });

    return Promise.all(rows.map(async row => ({
      ...row,
      base64: AvatarUtils.getBase64('coach-types', row.id) || undefined
    })));
  }
}
