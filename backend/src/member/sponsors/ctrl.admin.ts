import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SponsorService } from './service';
import { MemberSponsorDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/sponsors')
export class AdminSponsorController {
  constructor(private readonly sponsorService: SponsorService) { }

  @Post()
  create(@Body() createSponsorDto: MemberSponsorDto) {
    return this.sponsorService.create(createSponsorDto);
  }

  @Get()
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'sponsorLevel', required: false })
  findAll(
    @Query('status') status?: string,
    @Query('sponsorLevel') sponsorLevel?: string
  ) {
    return this.sponsorService.findAll(status, sponsorLevel);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sponsorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSponsorDto: MemberSponsorDto) {
    return this.sponsorService.update(id, updateSponsorDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.sponsorService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.sponsorService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.sponsorService.reorder(orders);
  }
}
