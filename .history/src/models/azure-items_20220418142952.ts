import { ProductJson } from './azure-product';

export class ItemsJson {
  Items: ProductJson[];
  nextPageToken: string;
}
