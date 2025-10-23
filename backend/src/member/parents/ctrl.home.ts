import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParentService } from './service';

@Controller('parents')
export class HomeParentController {
  constructor(private readonly parentService: ParentService) { }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.parentService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentService.findOne(id);
  }
}
