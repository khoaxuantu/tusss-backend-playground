import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private config: ConfigService) {}

  @Get()
  getHello(): string {
    console.log("Get config in app controller", this.config.get('tusss'));

    return this.appService.getHello();
  }
}
