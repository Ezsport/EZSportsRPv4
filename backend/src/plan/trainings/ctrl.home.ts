import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PlanTrainingsService } from './service';

@Controller('home/trainings')
export class HomePlanTrainingsController {
  constructor(private readonly planTrainingsService: PlanTrainingsService) {}

  @ApiOperation({ summary: 'Get all trainings' })
  @ApiResponse({ status: 200, description: 'List of trainings' })
  @ApiQuery({ name: 'status', type: String, required: false })
  @ApiQuery({ name: 'teamId', type: String, required: false })
  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('teamId') teamId?: string
  ) {
    return this.planTrainingsService.findAll({
      where: { 
        status,
        teamId
      }
    });
  }

  @ApiOperation({ summary: 'Get training by ID' })
  @ApiResponse({ status: 200, description: 'Details of a specific training' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planTrainingsService.findOne(id);
  }
}
