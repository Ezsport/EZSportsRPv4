import { Controller, Get, Param, Query } from '@nestjs/common';
import { SportsService } from './service';
import { ApiOperation, ApiQuery, ApiResponse, } from '@nestjs/swagger';


@Controller('sports')
export class HomeSportsController {
  constructor(private readonly sportsService: SportsService) { }

  @ApiOperation({ summary: 'Get all sports' })
  @ApiResponse({ status: 200, description: 'List of sports' })
  @ApiQuery({ name: 'active', type: Boolean, required: false })
  @Get()
  findAll(@Query('active') active?: boolean) {
    return this.sportsService.findAll(active);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportsService.findOne(+id);
  }


}
