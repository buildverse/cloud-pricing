import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product')
  getHello(): string {
    this.productService.createProducts();
    return 'Operation completed';
  }
}
