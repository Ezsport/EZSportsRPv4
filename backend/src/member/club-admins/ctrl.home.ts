import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClubAdminService } from './service';

@Controller('club-admins')
export class HomeClubAdminController {
  constructor(private readonly clubAdminService: ClubAdminService) { }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.clubAdminService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubAdminService.findOne(id);
  }
}
