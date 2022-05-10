import { Controller } from '@nestjs/common';

@Controller('product')
export class ProductController {

    @Get()
  getHello(): string {
    this.productService.createProducts();
    return 'Operation completed';
  }
}
