import { Injectable } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductHelperService {
  products: ProductDto[];
  product: ProductDto;
}
