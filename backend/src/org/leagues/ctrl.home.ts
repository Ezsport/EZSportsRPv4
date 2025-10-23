import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { LeaguesService } from './service';

@Controller('home/leagues')
export class HomeLeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @ApiOperation({ summary: 'Get all leagues' })
  @ApiResponse({ status: 200, description: 'List of leagues' })
  @ApiQuery({ name: 'status', type: String, required: false })
  @ApiQuery({ name: 'season', type: String, required: false })
  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('season') season?: string
  ) {
    return this.leaguesService.findAll({
      where: { 
        status,
        season
      }
    });
  }

  @ApiOperation({ summary: 'Get league by ID' })
  @ApiResponse({ status: 200, description: 'Details of a specific league' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaguesService.findOne(id);
  }
}
