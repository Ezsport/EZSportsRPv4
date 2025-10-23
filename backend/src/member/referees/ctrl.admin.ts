import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RefereeService } from './service';
import { MemberRefereeDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/referees')
export class AdminRefereeController {
  constructor(private readonly refereeService: RefereeService) { }

  @Post()
  create(@Body() createRefereeDto: MemberRefereeDto) {
    return this.refereeService.create(createRefereeDto);
  }

  @Get()
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'refereeType', required: false })
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefereeDto: MemberRefereeDto) {
    return this.refereeService.update(id, updateRefereeDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.refereeService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.refereeService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.refereeService.reorder(orders);
  }
}
