import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AzureRetailService } from './price-scraper/services/azure-retail.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly productHelperService: Produ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}