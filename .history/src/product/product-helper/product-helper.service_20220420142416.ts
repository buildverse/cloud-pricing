import { Injectable } from '@nestjs/common';
import { Product } from '../model/product';

@Injectable()
export class ProductHelperService {
  products: Product[];
  product: Product;

  parseProduct(payload: Object) {}
}
