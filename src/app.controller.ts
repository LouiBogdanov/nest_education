import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':param')
  getHello(@Param('param') param: string, @Query('qparam') qparam: string): string {
    console.log(param, qparam)
    return this.appService.getHello();
  }
}
