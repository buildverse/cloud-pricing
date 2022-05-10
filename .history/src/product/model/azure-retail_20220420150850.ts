import { Type } from 'class-transformer';
import { Items } from './Items';

export class AzureRetail {
  
    @Type(() => Items)
  items: Items[];
}
