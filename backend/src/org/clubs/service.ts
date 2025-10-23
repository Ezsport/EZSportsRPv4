import { Injectable, NotFoundException } from '@nestjs/common';
import { OrgClubDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) { }

  async create(clubDto: OrgClubDto) {
    const { base64, ...createData } = clubDto;

    const club = await (this.prisma as any).orgClub.create({
      data: {
        ...createData,
      }
    });

    AvatarUtils.saveBase64(base64, 'clubs', club.id);

    return club;
  }

  async findAll() {
    const rows = await (this.prisma as any).orgClub.findMany();

    return Promise.all(rows.map(async row => ({
      ...row,
      base64: await AvatarUtils.getBase64('clubs', row.id) || undefined
    })));
  }

  async findOne(id: string) {
    const club = await (this.prisma as any).orgClub.findUnique({
      where: { id }
    });

    if (!club) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }

    return {
      ...club,
      base64: await AvatarUtils.getBase64('clubs', club.id) || undefined
    };
  }

  async update(id: string, clubDto: OrgClubDto) {
    try {
      const { base64, ...updateData } = clubDto;

      AvatarUtils.saveBase64(base64, 'clubs', id);

      const club = await (this.prisma as any).orgClub.update({
        where: { id },
        data: clubDto
      });

      return club;
    } catch (error) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      AvatarUtils.deleteBase64('clubs', id);

      return await (this.prisma as any).orgClub.delete({
        where: { id }
      });
    } catch (error) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
  }
}
