import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GroupLevelsService } from './service';
import { BaseGroupLevelDto } from './dto';

@Controller('admin/group-levels')
export class AdminGroupLevelsController {
  constructor(private readonly groupLevelsService: GroupLevelsService) {}

  @Post()
  create(@Body() groupLevelDto: BaseGroupLevelDto) {
    return this.groupLevelsService.create(groupLevelDto);
  }

  @Get()
  findAll(
    @Query('active') active?: boolean,
    @Query('skip') skip?: number,
    @Query('take') take?: number
  ) {
    return this.groupLevelsService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where: { 
        isActive: active
      },
      orderBy: { ord: 'asc' }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupLevelsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() groupLevelDto: BaseGroupLevelDto
  ) {
    return this.groupLevelsService.update(id, groupLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupLevelsService.remove(id);
  }
}
