import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseGroupLevelDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GroupLevelsService {
  constructor(private prisma: PrismaService) {}

  async create(data: BaseGroupLevelDto) {
    return await (this.prisma as any).baseGroupLevel.create({
      data: data
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return await (this.prisma as any).baseGroupLevel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy ?? { name: 'asc' }
    });
  }

  async findOne(id: string) {
    const groupLevel = await (this.prisma as any).baseGroupLevel.findUnique({ 
      where: { id }
    });

    if (!groupLevel) {
      throw new NotFoundException(`Group Level with ID ${id} not found`);
    }

    return groupLevel;
  }

  async update(id: string, data: BaseGroupLevelDto) {
    try {
      const groupLevel = await (this.prisma as any).baseGroupLevel.update({
        where: { id },
        data: data
      });

      return groupLevel;
    } catch (error) {
      throw new NotFoundException(`Group Level with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await (this.prisma as any).baseGroupLevel.delete({ 
        where: { id } 
      });
    } catch (error) {
      throw new NotFoundException(`Group Level with ID ${id} not found`);
    }
  }
}
