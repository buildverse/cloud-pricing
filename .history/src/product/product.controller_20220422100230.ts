import { Controller } from '@nestjs/common';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService,
      ) {}

    @Get('/product')
  getHello(): string {
    this.productService.createProducts();
    return 'Operation completed';
  }
}
