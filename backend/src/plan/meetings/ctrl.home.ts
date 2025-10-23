import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PlanMeetingsService } from './service';

@Controller('home/meetings')
export class HomePlanMeetingsController {
  constructor(private readonly planMeetingsService: PlanMeetingsService) {}

  @ApiOperation({ summary: 'Get all meetings' })
  @ApiResponse({ status: 200, description: 'List of meetings' })
  @ApiQuery({ name: 'status', type: Number, required: false })
  @ApiQuery({ name: 'teamId', type: String, required: false })
  @Get()
  findAll(
    @Query('status') status?: number,
    @Query('teamId') teamId?: string
  ) {
    return this.planMeetingsService.findAll({
      where: { 
        status,
        teamId
      }
    });
  }

  @ApiOperation({ summary: 'Get meeting by ID' })
  @ApiResponse({ status: 200, description: 'Details of a specific meeting' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planMeetingsService.findOne(id);
  }
}
