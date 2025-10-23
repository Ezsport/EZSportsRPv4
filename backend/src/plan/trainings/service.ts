import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanTrainingDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanTrainingsService {
  constructor(private prisma: PrismaService) {}

  async create(trainingDto: PlanTrainingDto) {
    const training = await (this.prisma as any).planTraining.create({
      data: {
        ...trainingDto,
        status: trainingDto.status ?? 'scheduled',
        isAllMembers: trainingDto.isAllMembers ?? 0,
        recurringType: trainingDto.recurringType ?? 1
      }
    });

    return training;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const trainings = await (this.prisma as any).planTraining.findMany({
      skip,
      take,
      cursor: cursor ? { id: cursor } : undefined,
      where,
      orderBy: orderBy ?? { startDatetime: 'asc' }
    });

    return Promise.all(trainings.map(async training => ({
      ...training,
    })));
  }

  async findOne(id: string) {
    const training = await (this.prisma as any).planTraining.findUnique({ 
      where: { id }
    });

    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }

    return training;
  }

  async update(id: string, trainingDto: PlanTrainingDto) {
    try {
      const training = await (this.prisma as any).planTraining.update({
        where: { id },
        data: trainingDto
      });

      return training;
    } catch (error) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const training = await (this.prisma as any).planTraining.findUnique({
        where: { id }
      });

      if (!training) {
        throw new NotFoundException(`Training with ID ${id} not found`);
      }

      return await (this.prisma as any).planTraining.delete({ 
        where: { id } 
      });
    } catch (error) {
      console.error('Delete training error:', error);
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    return await (this.prisma as any).planTraining.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0];
      return (this.prisma as any).planTraining.update({
        where: { id },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
