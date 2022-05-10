import { Expose, Type } from 'class-transformer';
import { Items } from './Items';

export class AzureRetail {
  @Expose()
  @Type(() => Items)
  items: Items[];
}
