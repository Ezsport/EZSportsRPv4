import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlanTrainingsService } from './service';
import { PlanTrainingDto } from './dto';

@Controller('admin/trainings')
export class AdminPlanTrainingsController {
  constructor(private readonly planTrainingsService: PlanTrainingsService) {}

  @Post()
  create(@Body() trainingDto: PlanTrainingDto) {
    return this.planTrainingsService.create(trainingDto);
  }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('teamId') teamId?: string
  ) {
    return this.planTrainingsService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where: { 
        status,
        teamId
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planTrainingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() trainingDto: PlanTrainingDto
  ) {
    return this.planTrainingsService.update(id, trainingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planTrainingsService.remove(id);
  }
}
