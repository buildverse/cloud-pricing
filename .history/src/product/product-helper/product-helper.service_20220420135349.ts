import { Injectable } from '@nestjs/common';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductHelperService {
  products: Product[];
  product: Prooduct;
}
