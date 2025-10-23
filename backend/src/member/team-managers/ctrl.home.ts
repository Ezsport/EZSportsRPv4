import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeamManagerService } from './service';

@Controller('team-managers')
export class HomeTeamManagerController {
  constructor(private readonly teamManagerService: TeamManagerService) { }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.teamManagerService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamManagerService.findOne(id);
  }
}
