import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PersonService } from './service';
import { MemberPersonDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/persons')
export class AdminPersonController {
  constructor(private readonly personService: PersonService) { }

  @Post()
  create(@Body() memberPersonDto: MemberPersonDto) {
    return this.personService.create(memberPersonDto);
  }

  @Get()
  @ApiQuery({ name: 'status', required: false })
  findAll(@Query('status') status?: string) {
    return this.personService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() memberPersonDto: MemberPersonDto) {
    return this.personService.update(id, memberPersonDto);
  }

  @Delete('bulk')
  removeMany(@Body() ids: string[]) {
    return this.personService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }
}
