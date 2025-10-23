import { Controller, Get, Param, Query } from '@nestjs/common';
import { RefereeService } from './service';

@Controller('referees')
export class HomeRefereeController {
  constructor(private readonly refereeService: RefereeService) { }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('refereeType') refereeType?: string
  ) {
    return this.refereeService.findAll(status, refereeType);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refereeService.findOne(id);
  }
}
