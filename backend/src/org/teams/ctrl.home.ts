import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TeamsService } from './service';

@Controller('home/teams')
export class HomeTeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({ status: 200, description: 'List of teams' })
  @Get()
  findAll(
    params: {
      clubId?: string;
      sportId?: string;
    }
  ) {
    return this.teamsService.findAll({
      clubId: params.clubId,
      sportId: params.sportId
    });
  }

  @ApiOperation({ summary: 'Get team by ID' })
  @ApiResponse({ status: 200, description: 'Details of a specific team' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }
}
