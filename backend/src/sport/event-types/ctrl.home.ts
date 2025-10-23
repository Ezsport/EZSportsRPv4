import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventTypeService } from './service';

@Controller('event-types')
export class HomeEventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) { }

  @Get()
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
}
