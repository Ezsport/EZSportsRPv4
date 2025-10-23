import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ClubsService } from './service';

@Controller('home/clubs')
export class HomeClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @ApiOperation({ summary: 'Get all clubs' })
  @ApiResponse({ status: 200, description: 'List of clubs' })
  @ApiQuery({ name: 'status', type: String, required: false })
  @Get()
  findAll(
    @Query('status') status?: string
  ) {
    return this.clubsService.findAll();
  }

  @ApiOperation({ summary: 'Get club by ID' })
  @ApiResponse({ status: 200, description: 'Details of a specific club' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(id);
  }
}
