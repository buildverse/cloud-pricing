import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzureRetail } from '../dto/azure-retail';
import { ProductDto } from '../dto/product.dto';
import { plainToClass } from 'class-transformer';
import { Item } from '../dto/Items';
import * as objectHash from 'object-hash';
import { ProductAttributes } from '../dto/product-attributes';
import { Price } from '../dto/price';

const reservationTermMapping: { [key: string]: string } = {
  '1 Year': '1 yr',
  '3 Years': '3 yr',
  '5 Years': '5 yr',
};

@Injectable()
export class ProductHelperService {
  constructor(
    @InjectPinoLogger(ProductHelperService.name)
    private readonly logger: PinoLogger,
  ) {}

  // To be called for each page or file to creat product list that will be stored in DB
  parseProductInPage(payload: any): ProductDto[] {
    this.logger.debug(`JSON payload is ${} )
    const products: ProductDto[] = [];
    const azureRetail = plainToClass(AzureRetail, payload);
    this.logger.debug(`completed parsing payload as ${azureRetail}`);
    azureRetail.Items.forEach((item) => {
      const product = new ProductDto();
      product.sku = this.getSku(item);
      product.service = item.serviceName;
      product.productFamily = item.serviceFamily;
      product.vendorName = 'azure';
      product.region = item.armRegionName || null;
      // product.productHash = this.generateProductHash(product);
      product.attributes = this.getAttributes(item);
      product.prices = this.getPrices(item);
      products.push(product);
    });
    return products;
  }

  private getAttributes(item: Item): ProductAttributes {
    return {
      effectiveStartDate: item.effectiveStartDate,
      productId: item.productId,
      productName: this.fixWhitespace(item.productName), // because Azure sometimes uses non-breaking spaces here :(
      serviceId: item.serviceId,
      serviceFamily: item.serviceFamily,
      skuName: item.skuName,
      armSkuName: item.armSkuName,
      meterId: item.meterId,
      meterName: item.meterName,
    };
  }

  private getPrices(item: Item): Price[] {
    const prices: Price[] = [];

    let purchaseOption = item.type;
    if (item.skuName.endsWith(' Spot')) {
      purchaseOption = 'Spot';
    }

    if (item.skuName.endsWith(' Low Priority')) {
      purchaseOption = 'Low Priority';
    }

    const price: Price = {
      priceHash: '',
      purchaseOption,
      unit: item.unitOfMeasure,
      USD: `${item.unitPrice}`,
      effectiveDateStart: item.effectiveStartDate,
      startUsageAmount: item.tierMinimumUnits.toString(),
    };

    if (item.reservationTerm) {
      price.termLength = reservationTermMapping[item.reservationTerm];

      if (!price.termLength) {
        this.logger.warn(
          `Could not map reservation term for value ${item.reservationTerm}`,
        );
      }
    }

    // price.priceHash = generatePriceHash(product, price); - Need to check if we need this.

    prices.push(price);
    return prices;
  }

  private fixWhitespace(str: string): string {
    return str.replace(/\u00A0/g, ' ');
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
  private generateProductHash(product: ProductDto): string {
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
