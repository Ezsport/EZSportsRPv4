import { Injectable, NotFoundException } from '@nestjs/common';
import { SportEventTypeDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EventTypeService {
  constructor(private prisma: PrismaService) { }

  async create(eventTypeDto: SportEventTypeDto) {
    const eventType = await (this.prisma as any).sportEventType.create({
      data: {
        ...eventTypeDto,
        isVisible: eventTypeDto.isVisible ?? true
      }
    });

    return eventType;
  }

  async findAll(sportId?: number, visible?: boolean) {
    const eventTypes = await (this.prisma as any).sportEventType.findMany({
      where: {
        ...(sportId !== undefined && { sportId }),
        ...(visible !== undefined && { isVisible: visible ? 1 : 0 })
      },
      orderBy: { name: 'asc' }
    });

    return eventTypes;
  }

  async findOne(id: string) {
    const eventType = await (this.prisma as any).sportEventType.findUnique({
      where: { id }
    });

    if (!eventType) {
      throw new NotFoundException(`Event Type with ID ${id} not found`);
    }

    return eventType;
  }

  async update(id: string, updateEventTypeDto: SportEventTypeDto) {
    try {
      const eventType = await (this.prisma as any).sportEventType.update({
        where: { id },
        data: updateEventTypeDto
      });

      return eventType;
    } catch (error) {
      throw new NotFoundException(`Event Type with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    // Validate id
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id exists
      const eventType = await (this.prisma as any).sportEventType.findUnique({
        where: { id }
      });

      if (!eventType) {
        throw new NotFoundException(`Event Type with ID ${id} not found`);
      }

      // Perform delete
      return await (this.prisma as any).sportEventType.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete event type error:', error);
      throw new NotFoundException(`Event Type with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    return await (this.prisma as any).sportEventType.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).sportEventType.update({
        where: { id },
        data: { name: undefined }, // Prisma requires at least one field to update
      });
    });

    return Promise.all(updatePromises);
  }
}
