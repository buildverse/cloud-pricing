import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.]
  providers: [ProductService]
})
export class ProductModule {}
