import { Module } from '@nestjs/common';
import { ProductService } from './product.service';

@Module({
  imports: 
  providers: [ProductService]
})
export class ProductModule {}
