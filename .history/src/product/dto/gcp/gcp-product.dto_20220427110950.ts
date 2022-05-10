import { GCPCategory } from './gcp-category.dto';
import { Price } from './price';

export class GCPProduct {
  skuId: string;
  serviceRegions: string[];
  catgeory: GCPCategory;
  price: GCP[];
}
