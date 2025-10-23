import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlayerService } from './service';
import { MemberPlayerDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/players')
export class AdminPlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Post()
  create(@Body() createPlayerDto: MemberPlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  @ApiQuery({ name: 'status', required: false })
  findAll(@Query('status') status?: string) {
    return this.playerService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: MemberPlayerDto) {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.playerService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.playerService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.playerService.reorder(orders);
  }
}
