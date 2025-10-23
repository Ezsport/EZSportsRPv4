import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanMeetingDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanMeetingsService {
  constructor(private prisma: PrismaService) {}

  async create(meetingDto: PlanMeetingDto) {
    const meeting = await (this.prisma as any).planMeeting.create({
      data: {
        ...meetingDto,
        status: meetingDto.status ?? 1
      }
    });

    return meeting;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const meetings = await (this.prisma as any).planMeeting.findMany({
      skip,
      take,
      cursor: cursor ? { id: cursor } : undefined,
      where,
      orderBy: orderBy ?? { startDatetime: 'asc' }
    });

    return Promise.all(meetings.map(async meeting => ({
      ...meeting,
    })));
  }

  async findOne(id: string) {
    const meeting = await (this.prisma as any).planMeeting.findUnique({ 
      where: { id }
    });

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    }

    return meeting;
  }

  async update(id: string, data: PlanMeetingDto) {
    try {
      const meeting = await (this.prisma as any).planMeeting.update({
        where: { id },
        data: data
      });

      return meeting;
    } catch (error) {
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const meeting = await (this.prisma as any).planMeeting.findUnique({
        where: { id }
      });

      if (!meeting) {
        throw new NotFoundException(`Meeting with ID ${id} not found`);
      }

      return await (this.prisma as any).planMeeting.delete({ 
        where: { id } 
      });
    } catch (error) {
      console.error('Delete meeting error:', error);
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    return await (this.prisma as any).planMeeting.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0];
      return (this.prisma as any).planMeeting.update({
        where: { id },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
