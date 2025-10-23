import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { BaseCompetitionsService } from './service';
import { BaseCompetitionDto } from './dto';

@Controller('admin/base/competitions')
export class BaseCompetitionsAdminController {
  constructor(private readonly competitionsService: BaseCompetitionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: BaseCompetitionDto) {
    return this.competitionsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.competitionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateDto: BaseCompetitionDto
  ) {
    return this.competitionsService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.competitionsService.remove(id);
  }

  @Post('reorder')
  @HttpCode(HttpStatus.OK)
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.competitionsService.reorder(orders);
  }

  @Delete('bulk')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMany(@Body() ids: string[]) {
    return this.competitionsService.removeMany(ids);
  }
}
