import { Controller, Get, Param, Query } from '@nestjs/common';
import { GamePeriodService } from './service';

@Controller('game-periods')
export class HomeGamePeriodController {
  constructor(private readonly gamePeriodService: GamePeriodService) { }

  @Get()
  findAll(@Query('sportId') sportId?: number) {
    return this.gamePeriodService.findAll(sportId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamePeriodService.findOne(id);
  }
}
