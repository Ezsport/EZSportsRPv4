import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint(true)
  @Get()
  getHello(): string {
    return "<div style='text-align:center;margin-top:8rem;color:darkgreen;'><h1>This is the root API endpoint of EZSportsRP</h1><p>Please check the API documentation for more information. <a href='/docs'>API Docs</a></p></div>";
    // return this.appService.getHello();
  }
}
