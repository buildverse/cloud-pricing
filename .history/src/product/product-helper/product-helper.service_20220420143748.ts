import { Injectable } from '@nestjs/common';
import { AzureRetail } from '../model/azure-retail';
import { Product } from '../model/product';

@Injectable()
export class ProductHelperService {
  products: Product[];
  product: Product;

  parseProduct(payload: string) {
    const json 
  }
}
