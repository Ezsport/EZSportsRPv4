import { Injectable, NotFoundException } from '@nestjs/common';
import { SportManagerTypeDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ManagerTypeService {
  constructor(private prisma: PrismaService) { }

  async create(managerTypeDto: SportManagerTypeDto) {
    const managerType = await (this.prisma as any).sportManagerType.create({
      data: {
        ...managerTypeDto,
        isActive: managerTypeDto.isActive ?? true
      }
    });

    return managerType;
  }

  async findAll(sportId?: number, active?: boolean) {
    const managerTypes = await (this.prisma as any).sportManagerType.findMany({
      where: {
        ...(sportId !== undefined && { sportId }),
        ...(active !== undefined && { isActive: active ? 1 : 0 })
      },
      orderBy: { name: 'asc' }
    });

    return managerTypes;
  }

  async findOne(id: string) {
    const managerType = await (this.prisma as any).sportManagerType.findUnique({
      where: { id }
    });

    if (!managerType) {
      throw new NotFoundException(`Manager Type with ID ${id} not found`);
    }

    return managerType;
  }

  async update(id: string, updateManagerTypeDto: SportManagerTypeDto) {
    try {
      const managerType = await (this.prisma as any).sportManagerType.update({
        where: { id },
        data: updateManagerTypeDto
      });

      return managerType;
    } catch (error) {
      throw new NotFoundException(`Manager Type with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const managerType = await (this.prisma as any).sportManagerType.findUnique({
        where: { id }
      });

      if (!managerType) {
        throw new NotFoundException(`Manager Type with ID ${id} not found`);
      }

      // Perform delete
      return await (this.prisma as any).sportManagerType.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete manager type error:', error);
      throw new NotFoundException(`Manager Type with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    return await (this.prisma as any).sportManagerType.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).sportManagerType.update({
        where: { id },
        data: { name: undefined }, // Prisma requires at least one field to update
      });
    });

    return Promise.all(updatePromises);
  }
}
