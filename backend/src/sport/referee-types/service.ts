import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from 'src/utils/avatar.utils';
import { SportRefereeTypeDto } from './dto';

@Injectable()
export class RefereeTypeService {
  constructor(private prisma: PrismaService) { }

  async create(data: SportRefereeTypeDto) {
    const { base64, ...rest } = data;

    const refereeType = await (this.prisma as any).sportRefereeType.create({
      data: {
        ...rest,
      }
    });

    AvatarUtils.saveBase64(base64, 'referee-types', refereeType.id);

    return refereeType;
  }
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SportRefereeTypeWhereUniqueInput;
    where?: Prisma.SportRefereeTypeWhereInput;
    orderBy?: Prisma.SportRefereeTypeOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.sportRefereeType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findAllBySportId(sportId: string) {
    const rows = await (this.prisma as any).sportRefereeType.findMany({
      where: { sportId }
    });

    return Promise.all(rows.map(async row => ({
      ...row,
      base64: AvatarUtils.getBase64('referee-types', row.id) || undefined
    })));
  }

  async findOne(id: number) {
    const refereeType = await this.prisma.sportRefereeType.findUnique({ where: { id: id.toString() } });
    if (!refereeType) {
      throw new NotFoundException(`Referee Type with ID ${id} not found`);
    }
    return refereeType;
  }

  async update(id: number, data: SportRefereeTypeDto) {
    try {
      return await this.prisma.sportRefereeType.update({
        where: { id: id.toString() },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Referee Type with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.sportRefereeType.delete({ where: { id: id.toString() } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Referee Type with ID ${id} not found`);
      }
      throw error;
    }
  }
}
