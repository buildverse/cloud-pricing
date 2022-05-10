import { GCPCategory } from './gcp-category.dto';

export class GCPProduct {
  skuId: string;
  serviceRegions: string[];
  catgeory: GCPCategory;
  price: Price[];
}
