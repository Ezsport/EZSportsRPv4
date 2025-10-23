import { Controller, Get, Param, Query } from '@nestjs/common';
import { SponsorService } from './service';

@Controller('sponsors')
export class HomeSponsorController {
  constructor(private readonly sponsorService: SponsorService) { }

  @Get()
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
}
