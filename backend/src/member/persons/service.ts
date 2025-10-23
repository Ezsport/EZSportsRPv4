import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberPersonDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) { }

  async create(personDto: MemberPersonDto) {
    const { base64, ...createData } = personDto;

    const person = await (this.prisma as any).memberPerson.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    AvatarUtils.saveBase64(base64, 'persons', person.id);

    return person;
  }

  async findAll(status?: string) {
    const persons = await (this.prisma as any).memberPerson.findMany({
      where: status !== undefined ? { status } : undefined,
      orderBy: { lastName: 'asc' }
    });

    return Promise.all(persons.map(async person => ({
      ...person,
      base64: await AvatarUtils.getBase64('persons', person.id) || undefined
    })));
  }

  async findOne(id: string) {
    const person = await (this.prisma as any).memberPerson.findUnique({
      where: { id }
    });

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return {
      ...person,
      base64: await AvatarUtils.getBase64('persons', person.id) || undefined
    };
  }

  async update(id: string, updatePersonDto: MemberPersonDto) {
    try {
      const { base64, ...updateData } = updatePersonDto;

      AvatarUtils.saveBase64(base64, 'persons', id);

      const person = await (this.prisma as any).memberPerson.update({
        where: { id },
        data: updateData
      });

      return person;
    } catch (error) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      const person = await (this.prisma as any).memberPerson.findUnique({
        where: { id }
      });

      if (!person) {
        throw new NotFoundException(`Person with ID ${id} not found`);
      }

      AvatarUtils.deleteBase64('persons', id);

      return await (this.prisma as any).memberPerson.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Delete person error:', error);
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    ids.forEach(id => AvatarUtils.deleteBase64('persons', id));

    return await (this.prisma as any).memberPerson.deleteMany({
      where: { id: { in: ids } }
    });
  }
}
