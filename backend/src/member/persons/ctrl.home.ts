import { Controller, Get, Param, Query } from '@nestjs/common';
import { PersonService } from './service';

@Controller('persons')
export class HomePersonController {
  constructor(private readonly personService: PersonService) { }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.personService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }
}
