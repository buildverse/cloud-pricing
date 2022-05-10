import { Expose, Type } from 'class-transformer';
import { Item } from './Items';

export class AzureRetail {
  @Type(() => Item)
  Items: Item[];
}
