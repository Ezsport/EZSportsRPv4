import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FieldsService } from './service';

@Controller('home/fields')
export class HomeFieldsController {
  constructor(private readonly fieldsService: FieldsService) {}


  @ApiOperation({ summary: 'Get all fields' })
  @ApiResponse({ status: 200, description: 'List of fields' })
  @ApiQuery({ name: 'active', type: Boolean, required: false })
  @ApiQuery({ name: 'sportIds', type: [Number], required: false })
  @ApiQuery({ name: 'countryId', type: Number, required: false })
  @Get()
  findAll(
    @Query('active') active?: boolean,
    @Query('sportIds') sportIds?: number[],
    @Query('countryId') countryId?: number
  ) {
    return this.fieldsService.findAll(active, sportIds, countryId);
  }

  @ApiOperation({ summary: 'Get fields by country ID' })
  @ApiResponse({ status: 200, description: 'List of fields by country' })
  @ApiParam({ name: 'countryId', type: Number, required: true })
  @Get('country/:countryId')
  findByCountryId(@Param('countryId', ParseIntPipe) countryId: number) {
    return this.fieldsService.findAll(undefined, undefined, countryId);
  }
}
