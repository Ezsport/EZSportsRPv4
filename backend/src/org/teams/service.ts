import { Injectable, NotFoundException } from '@nestjs/common';
import { OrgTeamDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) { }

  async create(data: OrgTeamDto) {
    const { base64, ...rest } = data;

    const team = await (this.prisma as any).orgTeam.create({
      data: {
        ...rest,
        status: rest.status ?? 1,
      }
    });

    AvatarUtils.saveBase64(base64, 'teams', team.id);

    return team;
  }

  async findAll(params: {
    clubId?: string;
    sportId?: string;
  }) {
    const { clubId, sportId } = params;
    const teams = await (this.prisma as any).orgTeam.findMany({
      where: {
        clubId,
        sportId,
      }
    });

    return Promise.all(teams.map(async team => ({
      ...team,
      base64: await AvatarUtils.getBase64('teams', team.id) || undefined
    })));
  }

  async findOne(id: string) {
    const team = await (this.prisma as any).orgTeam.findUnique({
      where: { id }
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return {
      ...team,
      base64: await AvatarUtils.getBase64('teams', team.id) || undefined
    };
  }

  async update(id: string, data: OrgTeamDto) {
    try {
      const { base64, ...rest } = data;

      AvatarUtils.saveBase64(base64, 'teams', id);

      const result = await (this.prisma as any).orgTeam.update({
        where: { id },
        data: {
          ...rest,
          status: rest.status ?? 1,
        }
      });

      return result;
    } catch (error) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      // Validate id
      if (id === undefined || id === null) {
        throw new NotFoundException('Invalid ID provided for deletion');
      }

      // Ensure id exists
      const team = await (this.prisma as any).orgTeam.findUnique({
        where: { id }
      });

      if (!team) {
        throw new NotFoundException(`Team with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('teams', id);

      // Perform delete
      return await (this.prisma as any).orgTeam.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete team error:', error);
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all teams being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('teams', id));

    return await (this.prisma as any).orgTeam.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).orgTeam.update({
        where: { id },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
