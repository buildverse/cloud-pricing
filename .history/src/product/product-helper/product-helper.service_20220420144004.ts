import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzureRetail } from '../model/azure-retail';
import { Product } from '../model/product';

@Injectable()
export class ProductHelperService {
  products: Product[];
  product: Product;

  constructor ( @InjectPinoLogger(ProductHelperService.name)
  private readonly logger: PinoLogger,){}

  parseProduct(payload: string) {
    const json = <AzureRetail>JSON.parse(payload);
    this.logger.debug(`completed parsing payload as ${json}`)
  }
}
