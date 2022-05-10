import { Injectable } from '@nestjs/common';


@Injectable()
export class ProductHelperService {
  products: ProductDto[];
  product: ProductDto;
}
