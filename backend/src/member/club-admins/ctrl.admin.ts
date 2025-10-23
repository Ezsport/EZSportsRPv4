import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClubAdminService } from './service';
import { MemberClubAdminDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/club-admins')
export class AdminClubAdminController {
  constructor(private readonly clubAdminService: ClubAdminService) { }

  @Post()
  create(@Body() createClubAdminDto: MemberClubAdminDto) {
    return this.clubAdminService.create(createClubAdminDto);
  }

  @Get()
  @ApiQuery({ name: 'status', required: false })
  findAll(@Query('status') status?: string) {
    return this.clubAdminService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubAdminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubAdminDto: MemberClubAdminDto) {
    return this.clubAdminService.update(id, updateClubAdminDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.clubAdminService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.clubAdminService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.clubAdminService.reorder(orders);
  }
}
