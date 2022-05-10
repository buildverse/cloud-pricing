import { Module } from '@nestjs/common';
import { ProductService } from './product.service';

@Module({
  imports: [Typ]
  providers: [ProductService]
})
export class ProductModule {}
