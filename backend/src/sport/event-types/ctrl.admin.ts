import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventTypeService } from './service';
import { SportEventTypeDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/event-types')
export class AdminEventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) { }

  @Post()
  create(@Body() createEventTypeDto: SportEventTypeDto) {
    return this.eventTypeService.create(createEventTypeDto);
  }

  @Get()
  @ApiQuery({ name: 'sportId', required: false })
  @ApiQuery({ name: 'visible', required: false })
  findAll(
    @Query('sportId') sportId?: number, 
    @Query('visible') visible?: boolean
  ) {
    return this.eventTypeService.findAll(sportId, visible);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventTypeDto: SportEventTypeDto) {
    return this.eventTypeService.update(id, updateEventTypeDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.eventTypeService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.eventTypeService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.eventTypeService.reorder(orders);
  }
}
