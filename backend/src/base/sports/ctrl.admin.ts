import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SportsService } from './service';
import { BaseSportDto } from './dto';

@Controller('admin/sports')
export class AdminSportsController {
  constructor(private readonly sportsService: SportsService) { }

  @Post()
  create(@Body() baseSportDto: BaseSportDto) {
    return this.sportsService.create(baseSportDto);
  }

  @Get()
  findAll() {
    return this.sportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() baseSportDto: BaseSportDto) {
    return this.sportsService.update(+id, baseSportDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: number[]) {
    return this.sportsService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportsService.remove(+id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: number]: number }[]) {
    return this.sportsService.reorder(orders);
  }
}
