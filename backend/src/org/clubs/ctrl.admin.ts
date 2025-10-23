import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClubsService } from './service';
import { OrgClubDto } from './dto';

@Controller('admin/clubs')
export class AdminClubsController {
  constructor(private readonly clubsService: ClubsService) { }

  @Post()
  create(@Body() clubDto: OrgClubDto) {
    return this.clubsService.create(clubDto);
  }

  @Get()
  findAll() {
    return this.clubsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() clubDto: OrgClubDto
  ) {
    return this.clubsService.update(id, clubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubsService.remove(id);
  }
}
