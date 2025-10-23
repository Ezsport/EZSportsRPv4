import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberClubAdminDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';

@Injectable()
export class ClubAdminService {
  constructor(private prisma: PrismaService) { }

  async create(clubAdminDto: MemberClubAdminDto) {
    const { base64, ...createData } = clubAdminDto;

    const clubAdmin = await (this.prisma as any).memberClubAdmin.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    AvatarUtils.saveBase64(base64, 'club-admins', clubAdmin.id);

    return clubAdmin;
  }

  async findAll(status?: string) {
    const clubAdmins = await (this.prisma as any).memberClubAdmin.findMany({
      where: status !== undefined ? { status } : undefined,
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(clubAdmins.map(async clubAdmin => ({
      ...clubAdmin,
      base64: await AvatarUtils.getBase64('club-admins', clubAdmin.id) || undefined
    })));
  }

  async findOne(id: string) {
    const clubAdmin = await (this.prisma as any).memberClubAdmin.findUnique({
      where: { id }
    });

    if (!clubAdmin) {
      throw new NotFoundException(`Club Admin with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...clubAdmin,
      base64: await AvatarUtils.getBase64('club-admins', clubAdmin.id) || undefined
    };
  }

  async update(id: string, updateClubAdminDto: MemberClubAdminDto) {
    try {
      const { base64, ...updateData } = updateClubAdminDto;

      if (base64) {
        AvatarUtils.saveBase64(base64, 'club-admins', id);
      } else if (base64 === null) {
        AvatarUtils.deleteBase64('club-admins', id);
      }

      const clubAdmin = await (this.prisma as any).memberClubAdmin.update({
        where: { id },
        data: updateData
      });

      return clubAdmin;
    } catch (error) {
      throw new NotFoundException(`Club Admin with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const clubAdmin = await (this.prisma as any).memberClubAdmin.findUnique({
        where: { id }
      });

      if (!clubAdmin) {
        throw new NotFoundException(`Club Admin with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('club-admins', id);

      // Perform delete
      return await (this.prisma as any).memberClubAdmin.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete club admin error:', error);
      throw new NotFoundException(`Club Admin with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all club admins being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('club-admins', id));

    return await (this.prisma as any).memberClubAdmin.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).memberClubAdmin.update({
        where: { id },
        data: { ord }, // Update the order
      });
    });

    return Promise.all(updatePromises);
  }
}
