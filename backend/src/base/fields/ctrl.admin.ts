import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FieldsService } from './service';
import { BaseFieldDto } from './dto';

@Controller('admin/fields')
export class AdminFieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  create(@Body() fieldDto: BaseFieldDto) {
    return this.fieldsService.create(fieldDto);
  }

  @Get()
  findAll(
    @Query('active') active?: boolean,
    @Query('sportId') sportId?: number
  ) {
    return this.fieldsService.findAll(active, sportId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() fieldDto: BaseFieldDto) {
    return this.fieldsService.update(+id, fieldDto);
  }

  @Delete('bulk')
  removeMany(@Body() ids: number[]) {
    return this.fieldsService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(+id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: number]: number }[]) {
    return this.fieldsService.reorder(orders);
  }
}
