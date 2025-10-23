import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlayerService } from './service';

@Controller('players')
export class HomePlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.playerService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }
}
