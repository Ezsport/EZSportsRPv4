import { Injectable, NotFoundException } from '@nestjs/common';
import { OrgLeagueDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeaguesService {
  constructor(private prisma: PrismaService) {}

  async create(orgLeagueDto: OrgLeagueDto) {
    const { base64, ...createData } = orgLeagueDto;

    const league = await (this.prisma as any).orgLeague.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    AvatarUtils.saveBase64(base64, 'leagues', league.id);

    return league;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const leagues = await (this.prisma as any).orgLeague.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy ?? { name: 'asc' }
    });

    return Promise.all(leagues.map(async league => ({
      ...league,
      base64: await AvatarUtils.getBase64('leagues', league.id) || undefined
    })));
  }

  async findOne(id: string) {
    const league = await (this.prisma as any).orgLeague.findUnique({ 
      where: { id }
    });

    if (!league) {
      throw new NotFoundException(`League with ID ${id} not found`);
    }

    return {
      ...league,
      base64: await AvatarUtils.getBase64('leagues', league.id) || undefined
    };
  }

  async update(id: string, updateLeagueDto: OrgLeagueDto) {
    try {
      const { base64, ...updateData } = updateLeagueDto;

      AvatarUtils.saveBase64(base64, 'leagues', id);

      const league = await (this.prisma as any).orgLeague.update({
        where: { id },
        data: updateData
      });

      return league;
    } catch (error) {
      throw new NotFoundException(`League with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      AvatarUtils.deleteBase64('leagues', id);

      return await (this.prisma as any).orgLeague.delete({ 
        where: { id } 
      });
    } catch (error) {
      throw new NotFoundException(`League with ID ${id} not found`);
    }
  }
}
