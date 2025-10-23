import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ParentService } from './service';
import { MemberParentDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/parents')
export class AdminParentController {
  constructor(private readonly parentService: ParentService) { }

  @Post()
  create(@Body() createParentDto: MemberParentDto) {
    return this.parentService.create(createParentDto);
  }

  @Get()
  @ApiQuery({ name: 'status', required: false })
  findAll(@Query('status') status?: string) {
    return this.parentService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParentDto: MemberParentDto) {
    return this.parentService.update(id, updateParentDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.parentService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.parentService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.parentService.reorder(orders);
  }
}
