import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoachService } from './service';

@Controller('coaches')
export class HomeCoachController {
  constructor(private readonly coachService: CoachService) { }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.coachService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachService.findOne(id);
  }
}
