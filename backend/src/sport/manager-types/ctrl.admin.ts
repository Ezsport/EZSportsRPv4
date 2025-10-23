import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ManagerTypeService } from './service';
import { SportManagerTypeDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/manager-types')
export class AdminManagerTypeController {
  constructor(private readonly managerTypeService: ManagerTypeService) { }

  @Post()
  create(@Body() createManagerTypeDto: SportManagerTypeDto) {
    return this.managerTypeService.create(createManagerTypeDto);
  }

  @Get()
  @ApiQuery({ name: 'sportId', required: false })
  @ApiQuery({ name: 'active', required: false })
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerTypeDto: SportManagerTypeDto) {
    return this.managerTypeService.update(id, updateManagerTypeDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.managerTypeService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.managerTypeService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.managerTypeService.reorder(orders);
  }
}
