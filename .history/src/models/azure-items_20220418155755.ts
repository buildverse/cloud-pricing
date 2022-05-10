import { ProductJson } from './azure-product';

export class AzureItem {
  Items: ProductJson[];
  nextPageToken: string;
}
