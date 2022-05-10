import { Injectable } from '@nestjs/common';
import { ProductDto } from '../types/product';

@Injectable()
export class ProductHelperService {
  products: ProductDto[];
  product: ProductDto;
}
