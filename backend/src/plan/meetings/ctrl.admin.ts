import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlanMeetingsService } from './service';
import { PlanMeetingDto } from './dto';


@Controller('admin/meetings')
export class AdminPlanMeetingsController {
  constructor(private readonly planMeetingsService: PlanMeetingsService) {}

  @Post()
  create(@Body() meetingDto: PlanMeetingDto) {
    return this.planMeetingsService.create(meetingDto);
  }

  @Get()
  findAll(
    @Query('status') status?: number,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('teamId') teamId?: string
  ) {
    return this.planMeetingsService.findAll({
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
    return this.planMeetingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() meetingDto: PlanMeetingDto
  ) {
    return this.planMeetingsService.update(id, meetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planMeetingsService.remove(id);
  }
}
