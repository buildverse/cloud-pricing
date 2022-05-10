import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AzureRetailService } from './price-scraper/services/azure-retail.service';
import { ProductHelperService } from './product/product-helper/product-helper.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly productHelperService: ProductHelperService, Pr) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
