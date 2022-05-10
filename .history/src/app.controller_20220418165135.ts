import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly azurePricingService: AzurePric
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
