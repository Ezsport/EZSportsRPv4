import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TeamsService } from './service';
import { OrgTeamDto as CreateTeamDto } from './dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('admin/teams')
export class AdminTeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiQuery({ name: 'clubId', type: String, required: false })
  @ApiQuery({ name: 'sportId', type: String, required: false })
  findAll(
    @Query('clubId') clubId?: string,
    @Query('sportId') sportId?: string
  ) {
    return this.teamsService.findAll({
      clubId,
      sportId
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTeamDto: CreateTeamDto
  ) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
