import { Controller, Get, Param, Query } from '@nestjs/common';
import { ManagerTypeService } from './service';

@Controller('manager-types')
export class HomeManagerTypeController {
  constructor(private readonly managerTypeService: ManagerTypeService) { }

  @Get()
  findAll(
    @Query('sportId') sportId?: number, 
    @Query('active') active?: boolean
  ) {
    return this.managerTypeService.findAll(sportId, active);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerTypeService.findOne(id);
  }
}
