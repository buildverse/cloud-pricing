import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AzureRetailService } from './price-scraper/services/azure-retail.service';
import { ProductHelperService } from './product/product-helper/product-helper.service';
import { ProductService } from './product/product.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'hello w rold';
  }
}
