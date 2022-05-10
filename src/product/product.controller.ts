import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor() {}

  @Get('product')
  getHello(): string {
    //this.productService.createProducts();
    return 'Operation completed';
  }
}
