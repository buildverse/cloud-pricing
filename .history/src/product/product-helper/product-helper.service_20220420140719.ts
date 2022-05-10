import { Injectable } from '@nestjs/common';
import { ProductDto } from '../types/product.dto';

@Injectable()
export class ProductHelperService {
  products: ProductDto[];
  product: ProductDto;
}
