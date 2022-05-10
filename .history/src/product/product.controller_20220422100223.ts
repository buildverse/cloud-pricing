import { Controller } from '@nestjs/common';

@Controller('product')
export class ProductController {

    constructor(
        private readonly appService: AppService,
        private readonly productService: ProductService,
      ) {}

    @Get('/prodcut')
  getHello(): string {
    this.productService.createProducts();
    return 'Operation completed';
  }
}
