import { Injectable } from '@nestjs/common';
import { Product } from '../types/product';

@Injectable()
export class ProductHelperService {
  products: ProductDto[];
  product: ProductDto;
}
