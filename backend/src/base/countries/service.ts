import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseCountryDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AvatarUtils } from 'src/utils/avatar.utils';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) { }

  async create(data: BaseCountryDto) {

    const { base64, ...rest } = data;

    const result = await this.prisma.baseCountry.create({
      data: {
        ...rest,
        code: rest.code || '',
        isActive: rest.isActive === 1,
        updatedAt: new Date()
      }
    });

    AvatarUtils.saveBase64(base64, 'countries', result.id);

    return result;
  }

  // Helper method to determine the next order value
  private async determineNextOrder(): Promise<number> {
    const lastCountry = await this.prisma.baseCountry.findFirst({
      orderBy: { ord: 'desc' }
    });

    return lastCountry ? lastCountry.ord + 1 : 0;
  }

  async findAll(active?: boolean) {
    const countries = await this.prisma.baseCountry.findMany({
      where: active !== undefined
        ? { isActive: active } as any
        : undefined,
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(countries.map(async country => ({
      ...country,
      base64: AvatarUtils.getBase64('countries', country.id)
    })));
  }

  async findOne(id: number) {
    const country = await this.prisma.baseCountry.findUnique({
      where: { id: Number(id) }
    });

    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...country,
      base64: await AvatarUtils.getBase64('countries', country.id)
    };
  }

  async update(id: number, data: BaseCountryDto) {
    try {
      const { base64, ...rest } = data;

      const result = await this.prisma.baseCountry.update({
        where: { id: Number(id) },
        data: {
          ...rest,
          code: rest.code || '',
          isActive: rest.isActive === 1
        }
      });

      AvatarUtils.saveBase64(base64, 'countries', id);

      return result;
    } catch (error) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    // Validate id
    if (id === undefined || id === null || isNaN(id)) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id is a number and exists
      const country = await this.prisma.baseCountry.findUnique({
        where: { id: Number(id) }
      });

      if (!country) {
        throw new NotFoundException(`Country with ID ${id} not found`);
      }

      // Perform delete
      return await this.prisma.baseCountry.delete({
        where: { id: Number(id) }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete country error:', error);
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }

  async removeMany(ids: number[]) {
    // Delete avatars for all countries being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('countries', id));

    return await this.prisma.baseCountry.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: number]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).baseCountry.update({
        where: { id: Number(id) },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
