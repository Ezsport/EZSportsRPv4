import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberPlayerDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) { }

  async create(playerDto: MemberPlayerDto) {
    const { base64, ...createData } = playerDto;

    const player = await (this.prisma as any).memberPlayer.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    AvatarUtils.saveBase64(base64, 'players', player.id);

    return player;
  }

  async findAll(status?: string) {
    const players = await (this.prisma as any).memberPlayer.findMany({
      where: status !== undefined ? { status } : undefined,
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(players.map(async player => ({
      ...player,
      base64: await AvatarUtils.getBase64('players', player.id) || undefined
    })));
  }

  async findOne(id: string) {
    const player = await (this.prisma as any).memberPlayer.findUnique({
      where: { id }
    });

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...player,
      base64: await AvatarUtils.getBase64('players', player.id) || undefined
    };
  }

  async update(id: string, updatePlayerDto: MemberPlayerDto) {
    try {
      const { base64, ...updateData } = updatePlayerDto;

      if (base64) {
        AvatarUtils.saveBase64(base64, 'players', id);
      } else if (base64 === null) {
        AvatarUtils.deleteBase64('players', id);
      }

      const player = await (this.prisma as any).memberPlayer.update({
        where: { id },
        data: updateData
      });

      return player;
    } catch (error) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const player = await (this.prisma as any).memberPlayer.findUnique({
        where: { id }
      });

      if (!player) {
        throw new NotFoundException(`Player with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('players', id);

      // Perform delete
      return await (this.prisma as any).memberPlayer.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete player error:', error);
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all players being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('players', id));

    return await (this.prisma as any).memberPlayer.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).memberPlayer.update({
        where: { id },
        data: { ord }, // Update the order
      });
    });

    return Promise.all(updatePromises);
  }
}
