import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GroupLevelsService } from './service';

@Controller('home/group-levels')
export class HomeGroupLevelsController {
  constructor(private readonly groupLevelsService: GroupLevelsService) {}

  @ApiOperation({ summary: 'Get all group levels' })
  @ApiResponse({ status: 200, description: 'List of group levels' })
  @ApiQuery({ name: 'status', type: String, required: false })
  @Get()
  findAll(
    @Query('status') status?: string
  ) {
    return this.groupLevelsService.findAll({
      
    });
  }

  @ApiOperation({ summary: 'Get group level by ID' })
  @ApiResponse({ status: 200, description: 'Details of a specific group level' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupLevelsService.findOne(id);
  }
}
