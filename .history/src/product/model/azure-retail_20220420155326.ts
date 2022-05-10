import { Expose, Type } from 'class-transformer';
import { Item } from './Items';

export class AzureRetail {
  @Expose()
  @Type(() => Items)
  Items: Item[];
}
