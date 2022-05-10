import { Price } from './azure-price';
import { ProductAttributes } from './product-attributes';

export class ProductDto {
  productHash?: string;
  sku: string;
  vendorName: string;
  region: string | null;
  service: string;
  productFamily: string;
  attributes: ProductAttributes;
  prices: Price[];
}
