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
  productId: string; 
  productName: , // because Azure sometimes uses non-breaking spaces here :(
  serviceId: productJson.serviceId,
  serviceFamily: productJson.serviceFamily,
  skuName: productJson.skuName,
  armSkuName: productJson.armSkuName,
  meterId: productJson.meterId,
  meterName: productJson.meterName,
}
