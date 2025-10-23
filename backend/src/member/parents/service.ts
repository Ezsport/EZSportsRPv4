import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberParentDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ParentService {
  constructor(private prisma: PrismaService) { }

  async create(parentDto: MemberParentDto) {
    const { base64, ...createData } = parentDto;

    const parent = await (this.prisma as any).memberParent.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    if (base64) {
      AvatarUtils.saveBase64(base64, 'parents', parent.id);
    } else if (base64 === null) {
      AvatarUtils.deleteBase64('parents', parent.id);
    }

    return parent;
  }

  async findAll(status?: string) {
    const parents = await (this.prisma as any).memberParent.findMany({
      where: status !== undefined ? { status } : undefined,
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(parents.map(async parent => ({
      ...parent,
      base64: await AvatarUtils.getBase64('parents', parent.id) || undefined
    })));
  }

  async findOne(id: string) {
    const parent = await (this.prisma as any).memberParent.findUnique({
      where: { id }
    });

    if (!parent) {
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...parent,
      base64: await AvatarUtils.getBase64('parents', parent.id) || undefined
    };
  }

  async update(id: string, updateParentDto: MemberParentDto) {
    try {
      const { base64, ...updateData } = updateParentDto;

      if (base64) {
        AvatarUtils.saveBase64(base64, 'parents', id);
      } else if (base64 === null) {
        AvatarUtils.deleteBase64('parents', id);
      }

      const parent = await (this.prisma as any).memberParent.update({
        where: { id },
        data: updateData
      });

      return parent;
    } catch (error) {
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const parent = await (this.prisma as any).memberParent.findUnique({
        where: { id }
      });

      if (!parent) {
        throw new NotFoundException(`Parent with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('parents', id);

      // Perform delete
      return await (this.prisma as any).memberParent.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete parent error:', error);
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all parents being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('parents', id));

    return await (this.prisma as any).memberParent.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).memberParent.update({
        where: { id },
        data: { ord }, // Update the order
      });
    });

    return Promise.all(updatePromises);
  }
}
