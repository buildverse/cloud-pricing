import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzureRetail } from '../model/azure-retail';
import { Product } from '../model/product';
import { plainToClass } from 'class-transformer';
import { Item } from '../model/Items';

@Injectable()
export class ProductHelperService {
  products: Product[];
  product: Product;

  constructor(
    @InjectPinoLogger(ProductHelperService.name)
    private readonly logger: PinoLogger,
  ) {}

  parseProduct(payload: any) {
    const azureRetail = plainToClass(AzureRetail, payload);
    this.logger.debug(`completed parsing payload as ${azureRetail}`);
    azureRetail.Items.forEach((item) => {
      this.product = new Product();
    });
    console.log('-------' + azureRetail.Items);
  }

  private get sku(item: Item) {
      let sku = `${item.skuId}/$`
  }
}
