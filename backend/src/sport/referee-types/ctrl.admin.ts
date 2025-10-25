import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RefereeTypeService } from './service';
import { SportRefereeTypeDto } from './dto';


@Controller('admin/referee-types')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
export class RefereeTypeAdminController {
  constructor(private readonly service: RefereeTypeService) { }

  @Post()
  create(@Body() createDto: SportRefereeTypeDto) {
    return this.service.create(createDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SportRefereeTypeDto
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
