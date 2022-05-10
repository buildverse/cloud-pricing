import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {
    console.log(configService.get('DATABASE_ENTITIES'));
    console.log(configService.get('DATABASE_PORT'));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
