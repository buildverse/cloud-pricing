import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzureRetail } from '../model/azure-retail';
import { Product } from '../model/product';
import { plainToClass } from 'class-transformer';
import { Item } from '../model/Items';
import _ from 'lodash';
import * as crypto from 'crypto';

@Injectable()
export class ProductHelperService {
  constructor(
    @InjectPinoLogger(ProductHelperService.name)
    private readonly logger: PinoLogger,
  ) {}

  // To be called for each page or file to creat product list that will be stored in DB
  parseProductInPage(payload: any): Product[] {
    const products: Product[] = [];
    const azureRetail = plainToClass(AzureRetail, payload);
    this.logger.debug(`completed parsing payload as ${azureRetail}`);
    azureRetail.Items.forEach((item) => {
      const product = new Product();
      product.sku = this.getSku(item);
      product.productFamily = item.serviceFamily;
      product.vendorName = 'azure';
      product.region = item.armRegionName || null;
      product.productHash = this.generateProductHash(product);
      //this.product.attributes = getAttributes(items);
      products.push(product);
    });
    console.log('Products now are '+ products);
    return products;
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
