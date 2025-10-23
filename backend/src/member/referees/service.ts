import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberRefereeDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RefereeService {
  constructor(private prisma: PrismaService) { }

  async create(refereeDto: MemberRefereeDto) {
    const { base64, ...createData } = refereeDto;

    const referee = await (this.prisma as any).memberReferee.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    AvatarUtils.saveBase64(base64, 'referees', referee.id);

    return referee;
  }

  async findAll(status?: string, refereeType?: string) {
    const referees = await (this.prisma as any).memberReferee.findMany({
      where: {
        ...(status !== undefined && { status }),
        ...(refereeType !== undefined && { refereeType })
      },
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(referees.map(async referee => ({
      ...referee,
      base64: await AvatarUtils.getBase64('referees', referee.id) || undefined
    })));
  }

  async findOne(id: string) {
    const referee = await (this.prisma as any).memberReferee.findUnique({
      where: { id }
    });

    if (!referee) {
      throw new NotFoundException(`Referee with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...referee,
      base64: await AvatarUtils.getBase64('referees', referee.id) || undefined
    };
  }

  async update(id: string, updateRefereeDto: MemberRefereeDto) {
    try {
      const { base64, ...updateData } = updateRefereeDto;

      AvatarUtils.saveBase64(base64, 'referees', id);

      const referee = await (this.prisma as any).memberReferee.update({
        where: { id },
        data: updateData
      });

      return referee;
    } catch (error) {
      throw new NotFoundException(`Referee with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const referee = await (this.prisma as any).memberReferee.findUnique({
        where: { id }
      });

      if (!referee) {
        throw new NotFoundException(`Referee with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('referees', id);

      // Perform delete
      return await (this.prisma as any).memberReferee.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete referee error:', error);
      throw new NotFoundException(`Referee with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all referees being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('referees', id));

    return await (this.prisma as any).memberReferee.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).memberReferee.update({
        where: { id },
        data: { ord }, // Update the order
      });
    });

    return Promise.all(updatePromises);
  }
}
