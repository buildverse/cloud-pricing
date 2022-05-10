import { Injectable } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductHelperService {
  products: ProductDto[];
  product: ProductDto;
}
