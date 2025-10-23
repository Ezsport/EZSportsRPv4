import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlanGamesService } from './service';
import { PlanGameDto } from './dto';

@Controller('admin/plan-games')
export class AdminPlanGamesController {
  constructor(private readonly planGamesService: PlanGamesService) {}

  @Post()
  create(@Body() gameDto: PlanGameDto) {
    return this.planGamesService.create(gameDto);
  }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('leagueId') leagueId?: string
  ) {
    return this.planGamesService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where: { 
        status,
        leagueId
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planGamesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() gameDto: PlanGameDto
  ) {
    return this.planGamesService.update(id, gameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planGamesService.remove(id);
  }
}
