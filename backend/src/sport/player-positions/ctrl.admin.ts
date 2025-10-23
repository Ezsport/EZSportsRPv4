import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlayerPositionService } from './service';
import { SportPlayerPositionDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/player-positions')
export class AdminPlayerPositionController {
  constructor(private readonly playerPositionService: PlayerPositionService) { }

  @Post()
  create(@Body() createPlayerPositionDto: SportPlayerPositionDto) {
    return this.playerPositionService.create(createPlayerPositionDto);
  }

  @Get()
  @ApiQuery({ name: 'sportId', required: false })
  findAll(@Query('sportId') sportId?: number) {
    return this.playerPositionService.findAll(sportId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerPositionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerPositionDto: SportPlayerPositionDto) {
    return this.playerPositionService.update(id, updatePlayerPositionDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.playerPositionService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.playerPositionService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.playerPositionService.reorder(orders);
  }
}
