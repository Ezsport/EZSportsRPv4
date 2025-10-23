import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberSponsorDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SponsorService {
  constructor(private prisma: PrismaService) { }

  async create(sponsorDto: MemberSponsorDto) {
    const { base64, ...createData } = sponsorDto;

    const sponsor = await (this.prisma as any).memberSponsor.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    AvatarUtils.saveBase64(base64, 'sponsors', sponsor.id);

    return sponsor;
  }

  async findAll(status?: string, sponsorLevel?: string) {
    const sponsors = await (this.prisma as any).memberSponsor.findMany({
      where: {
        ...(status !== undefined && { status }),
        ...(sponsorLevel !== undefined && { sponsorLevel })
      },
      orderBy: { ord: 'asc' }
    });

    // Attach logos
    return Promise.all(sponsors.map(async sponsor => ({
      ...sponsor,
      base64: await AvatarUtils.getBase64('sponsors', sponsor.id) || undefined
    })));
  }

  async findOne(id: string) {
    const sponsor = await (this.prisma as any).memberSponsor.findUnique({
      where: { id }
    });

    if (!sponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }

    // Attach logo
    return {
      ...sponsor,
      base64: await AvatarUtils.getBase64('sponsors', sponsor.id) || undefined
    };
  }

  async update(id: string, updateSponsorDto: MemberSponsorDto) {
    try {
      const { base64, ...updateData } = updateSponsorDto;

      if (base64) {
        AvatarUtils.saveBase64(base64, 'sponsors', id);
      } else if (base64 === null) {
        AvatarUtils.deleteBase64('sponsors', id);
      }

      const sponsor = await (this.prisma as any).memberSponsor.update({
        where: { id },
        data: updateData
      });

      return sponsor;
    } catch (error) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const sponsor = await (this.prisma as any).memberSponsor.findUnique({
        where: { id }
      });

      if (!sponsor) {
        throw new NotFoundException(`Sponsor with ID ${id} not found`);
      }

      // Delete logo if exists
      AvatarUtils.deleteBase64('sponsors', id);

      // Perform delete
      return await (this.prisma as any).memberSponsor.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete sponsor error:', error);
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete logos for all sponsors being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('sponsors', id));

    return await (this.prisma as any).memberSponsor.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).memberSponsor.update({
        where: { id },
        data: { ord }, // Update the order
      });
    });

    return Promise.all(updatePromises);
  }
}
