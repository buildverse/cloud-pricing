import { GCPCategory } from './gcp-category.dto';
import { GCPPrice } from './gcp-price.dto';

export class GCPProduct {
  skuId: string;
  serviceRegions: string[];
  catgeory: GCPCategory;
  price: GCPPrice[];
}
