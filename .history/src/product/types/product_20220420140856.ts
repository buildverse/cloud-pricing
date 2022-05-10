import { Price } from './price';

export interace Product {
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
