import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesService } from './service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('countries')
export class HomeCountriesController {
  constructor(private readonly countriesService: CountriesService) { }

  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'List of countries' })
  @ApiQuery({ name: 'active', type: Boolean, required: false })
  @Get()
  findAll(@Query('active') active?: boolean) {
    return this.countriesService.findAll(active);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(+id);
  }
}
