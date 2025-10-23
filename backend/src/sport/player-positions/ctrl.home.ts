import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlayerPositionService } from './service';

@Controller('player-positions')
export class HomePlayerPositionController {
  constructor(private readonly playerPositionService: PlayerPositionService) { }

  @Get()
  findAll(@Query('sportId') sportId?: number) {
    return this.playerPositionService.findAll(sportId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerPositionService.findOne(id);
  }
}
