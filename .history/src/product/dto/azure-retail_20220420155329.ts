import { Expose, Type } from 'class-transformer';
import { Item } from './Items';

export class AzureRetail {
  @Expose()
  @Type(() => Item)
  Items: Item[];
}
