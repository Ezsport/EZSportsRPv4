import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberTeamManagerDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TeamManagerService {
  constructor(private prisma: PrismaService) { }

  async create(teamManagerDto: MemberTeamManagerDto) {
    const { base64, ...createData } = teamManagerDto;

    const teamManager = await (this.prisma as any).memberTeamManager.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    AvatarUtils.saveBase64(base64, 'team-managers', teamManager.id);

    return teamManager;
  }

  async findAll(status?: string) {
    const teamManagers = await (this.prisma as any).memberTeamManager.findMany({
      where: status !== undefined ? { status } : undefined,
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(teamManagers.map(async teamManager => ({
      ...teamManager,
      base64: await AvatarUtils.getBase64('team-managers', teamManager.id) || undefined
    })));
  }

  async findOne(id: string) {
    const teamManager = await (this.prisma as any).memberTeamManager.findUnique({
      where: { id }
    });

    if (!teamManager) {
      throw new NotFoundException(`Team Manager with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...teamManager,
      base64: await AvatarUtils.getBase64('team-managers', teamManager.id) || undefined
    };
  }

  async update(id: string, updateTeamManagerDto: MemberTeamManagerDto) {
    try {
      const { base64, ...updateData } = updateTeamManagerDto;

      if (base64) {
        AvatarUtils.saveBase64(base64, 'team-managers', id);
      } else if (base64 === null) {
        AvatarUtils.deleteBase64('team-managers', id);
      }

      const teamManager = await (this.prisma as any).memberTeamManager.update({
        where: { id },
        data: updateData
      });

      return teamManager;
    } catch (error) {
      throw new NotFoundException(`Team Manager with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const teamManager = await (this.prisma as any).memberTeamManager.findUnique({
        where: { id }
      });

      if (!teamManager) {
        throw new NotFoundException(`Team Manager with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('team-managers', id);

      // Perform delete
      return await (this.prisma as any).memberTeamManager.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete team manager error:', error);
      throw new NotFoundException(`Team Manager with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all team managers being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('team-managers', id));

    return await (this.prisma as any).memberTeamManager.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).memberTeamManager.update({
        where: { id },
        data: { ord }, // Update the order
      });
    });

    return Promise.all(updatePromises);
  }
}
