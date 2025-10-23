import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PlanGamesService } from './service';

@Controller('/plan/games')
export class HomePlanGamesController {
  constructor(private readonly planGamesService: PlanGamesService) {}

  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, description: 'List of games' })
  @ApiQuery({ name: 'status', type: String, required: false })
  @ApiQuery({ name: 'leagueId', type: String, required: false })
  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('leagueId') leagueId?: string
  ) {
    return this.planGamesService.findAll({
      where: { 
        status,
        leagueId
      }
    });
  }

  @ApiOperation({ summary: 'Get game by ID' })
  @ApiResponse({ status: 200, description: 'Details of a specific game' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planGamesService.findOne(id);
  }
}
