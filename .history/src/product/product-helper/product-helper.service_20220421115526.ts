import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzureRetail } from '../model/azure-retail';
import { Product } from '../model/product';
import { plainToClass } from 'class-transformer';
import { Item } from '../model/Items';
import * as objectHash from 'object-hash';
import { ProductAttributes } from '../model/product-attributes';

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
      // product.productHash = this.generateProductHash(product);
      product.attributes = getAttributes(item);
      products.push(product);
    });
    //console.log('Products now are ' + JSON.stringify(products));
    return products;
  }

  private getAttributes(item: Item) {
    const attributes = new ProductAttributes();
    
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

  //TODO: Dont use for now.. will check later
  private generateProductHash(product: Product): string {
    let data: string[];
    if (product.vendorName === 'aws') {
      data = [product.vendorName, product.sku];
    } else {
      data = [product.vendorName, product.region, product.sku];
    }

    // console.log('What is my data ' + JSON.stringify(data));
    return objectHash.sha1(data);
  }
}
