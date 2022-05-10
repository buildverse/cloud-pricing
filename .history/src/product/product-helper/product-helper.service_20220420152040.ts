import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzureRetail } from '../model/azure-retail';
import { Product } from '../model/product';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductHelperService {
  products: Product[];
  product: Product;

  constructor(
    @InjectPinoLogger(ProductHelperService.name)
    private readonly logger: PinoLogger,
  ) {}

  parseProduct(payload: {} ) {
    const azureRetail = <AzureRetail>(
      plainToClass(AzureRetail, JSON.parse(payload), {
        excludeExtraneousValues: true,
      })
    );
    this.logger.debug(`completed parsing payload as ${azureRetail}`);
    console.log('--------' + JSON.stringify(azureRetail));
  }
}
