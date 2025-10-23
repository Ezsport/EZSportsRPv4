import {
  Controller,
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { BaseCompetitionsService } from './service';
import { Prisma } from '@prisma/client';

@Controller('home/base/competitions')
export class BaseCompetitionsHomeController {
  constructor(private readonly competitionsService: BaseCompetitionsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
  ) {
    return this.competitionsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.competitionsService.findOne(id);
  }
}
