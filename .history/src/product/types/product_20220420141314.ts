import { Price } from './price';
import { ProductAttributes } from './product-attributes';

export interface Product {
  productHash: string;
  sku: string;
  vendorName: string;
  region: string | null;
  service: string;
  productFamily: string;
  attributes: ProductAttributes;
  prices: Price[];
}
