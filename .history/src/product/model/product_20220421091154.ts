import { Price } from './price';
import { ProductAttributes } from './product-attributes';

export class Product {
  productHash: string;
  sku: string;
  vendorName: string;
  region: string | null;
  service: string;
  productFamily: string;
  //attributes: ProductAttributes;
  //prices: Price[];
  effectiveStartDate: Date;
  productId: string; 
  productName: string; // because Azure sometimes uses non-breaking spaces here :(
  serviceId: string;
  serviceFamily: string;
  skuName: string;
  armSkuName: string;
  meterId: string;
  meterName: string;
  priceUnit: string;
  unitPrice: number;
  purchaseOption: string;
  effectiveStartDate: Date;
  start
}
