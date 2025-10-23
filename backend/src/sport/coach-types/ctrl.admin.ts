import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CoachTypeService } from './service';
import { SportCoachTypeDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/coach-types')
export class AdminCoachTypeController {
  constructor(private readonly coachTypeService: CoachTypeService) { }

  @Post()
  create(@Body() createCoachTypeDto: SportCoachTypeDto) {
    return this.coachTypeService.create(createCoachTypeDto);
  }

  @Get()
  findAll(@Query('active') active?: boolean) {
    return this.coachTypeService.findAll(active);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachTypeDto: SportCoachTypeDto) {
    return this.coachTypeService.update(id, updateCoachTypeDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.coachTypeService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.coachTypeService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.coachTypeService.reorder(orders);
  }
}
