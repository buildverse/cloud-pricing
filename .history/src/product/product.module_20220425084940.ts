import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { ProductHelperService } from './product-helper/product-helper.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductHelperService],
  controllers: [ProductController],
  exports: [ProductService, ProductHelperService],
})
export class ProductModule {}
