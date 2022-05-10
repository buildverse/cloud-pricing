import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzureRetail } from '../model/azure-retail';
import { Product } from '../model/product';
import { plainToClass } from 'class-transformer';
import { Item } from '../model/Items';
import _ from 'lodash';
import {cre}

@Injectable()
export class ProductHelperService {
  products: Product[] = [];

  constructor(
    @InjectPinoLogger(ProductHelperService.name)
    private readonly logger: PinoLogger,
  ) {}

  parseProduct(payload: any) {
    const azureRetail = plainToClass(AzureRetail, payload);
    this.logger.debug(`completed parsing payload as ${azureRetail}`);
    azureRetail.Items.forEach((item) => {
      const product = new Product();
      product.sku = this.getSku(item);
      product.productFamily = item.serviceFamily;
      product.vendorName = 'azure';
      product.region = item.armRegionName || null;
      //this.product.attributes = getAttributes(items);
      this.products.push(product);
    });
  }

  private getSku(item: Item): string {
    let sku = `${item.skuId}/${item.meterId}`;

    // Use the ARM SKU Name for VMs and App Service Plans so we can group the purchase options
    if (
      item.serviceName === 'Virtual Machines' ||
      item.serviceName === 'Azure App Service'
    ) {
      sku = `${item.productId}/${item.armSkuName}/${item.meterId}`;
    }
    return sku;
  }

  private generateProductHash(product: Product): string {
    let hashFields: string[];
    // keep AWS product hashes the same so Infracost tests don't break
    if (product.vendorName === 'aws') {
      hashFields = ['vendorName', 'sku'];
    } else {
      hashFields = ['vendorName', 'region', 'sku'];
    }
  
    const hashableValues = _.values(_.pick(product, hashFields));
    return crypto
      .createHash('md5')
      .update(hashableValues.join('-'))
      .digest('hex');
  }
  
}
