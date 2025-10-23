import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GamePeriodService } from './service';
import { SportGamePeriodDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/game-periods')
export class AdminGamePeriodController {
  constructor(private readonly gamePeriodService: GamePeriodService) { }

  @Post()
  create(@Body() createGamePeriodDto: SportGamePeriodDto) {
    return this.gamePeriodService.create(createGamePeriodDto);
  }

  @Get()
  @ApiQuery({ name: 'sportId', required: false })
  findAll(@Query('sportId') sportId?: number) {
    return this.gamePeriodService.findAll(sportId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamePeriodService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGamePeriodDto: SportGamePeriodDto) {
    return this.gamePeriodService.update(id, updateGamePeriodDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.gamePeriodService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.gamePeriodService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.gamePeriodService.reorder(orders);
  }
}
