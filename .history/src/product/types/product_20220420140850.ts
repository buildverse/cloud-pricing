import { Price } from './price';

export class Product {
  productHash: string;

  sku: string;

  service: string;

  productFamily: string;

  attributes: string;

  vendorName: string;

  region: string;

  attribuyes: string;

  prices: PriceDto[];
}
