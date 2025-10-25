import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RefereeTypeService } from './service';

@Controller('referee-types')
export class RefereeTypeHomeController {
  constructor(private readonly service: RefereeTypeService) {}

  @Get()
  findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('name') name?: string,
  ) {
    return this.service.findAll({
      skip,
      take,
      where: name ? { name: { contains: name } } : {},
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get('sport/:sportId')
  findAllBySportId(@Param('sportId') sportId: string) {
    return this.service.findAllBySportId(sportId);
  }

}
