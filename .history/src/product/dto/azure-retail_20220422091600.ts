import { Expose, Type } from 'class-transformer';
import { Item } from './Items';

export class AzureRetail {
  @Type(() => Item) // used for nested objects
  Items: Item[];
}
