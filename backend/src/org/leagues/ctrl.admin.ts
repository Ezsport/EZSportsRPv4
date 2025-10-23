import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LeaguesService } from './service';
import { OrgLeagueDto as CreateLeagueDto } from './dto';

@Controller('admin/leagues')
export class AdminLeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leaguesService.create(createLeagueDto);
  }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('season') season?: string
  ) {
    return this.leaguesService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where: { 
        status,
        season
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaguesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateLeagueDto: CreateLeagueDto
  ) {
    return this.leaguesService.update(id, updateLeagueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaguesService.remove(id);
  }
}
