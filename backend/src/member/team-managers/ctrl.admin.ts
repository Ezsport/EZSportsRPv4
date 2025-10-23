import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TeamManagerService } from './service';
import { MemberTeamManagerDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/team-managers')
export class AdminTeamManagerController {
  constructor(private readonly teamManagerService: TeamManagerService) { }

  @Post()
  create(@Body() createTeamManagerDto: MemberTeamManagerDto) {
    return this.teamManagerService.create(createTeamManagerDto);
  }

  @Get()
  @ApiQuery({ name: 'status', required: false })
  findAll(@Query('status') status?: string) {
    return this.teamManagerService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamManagerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamManagerDto: MemberTeamManagerDto) {
    return this.teamManagerService.update(id, updateTeamManagerDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.teamManagerService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.teamManagerService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.teamManagerService.reorder(orders);
  }
}
