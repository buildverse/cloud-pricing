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
const jsonDataLoad = {
  BillingCurrency: 'USD',
  CustomerEntityId: 'Default',
  CustomerEntityType: 'Retail',
  Items: [
    {
      currencyCode: 'USD',
      tierMinimumUnits: 0,
      retailPrice: 0.145125,
      unitPrice: 0.145125,
      armRegionName: 'southindia',
      location: 'IN South',
      effectiveStartDate: '2022-04-01T00:00:00Z',
      meterId: '001752ab-2e87-599e-8fac-f1ada637ca61',
      meterName: 'D5 v2/DS5 v2 Spot',
      productId: 'DZH318Z0BQ34',
      skuId: 'DZH318Z0BQ34/02JJ',
      productName: 'Virtual Machines Dv2 Series',
      skuName: 'D5 v2 Spot',
      serviceName: 'Storage',
      serviceId: 'DZH313Z7MMC8',
      serviceFamily: 'Compute',
      unitOfMeasure: '1 Hour',
      type: 'Consumption',
      isPrimaryMeterRegion: true,
      armSkuName: 'Standard_D5_v2',
    },
    {
      currencyCode: 'USD',
      tierMinimumUnits: 0,
      retailPrice: 0.456,
      unitPrice: 0.456,
      armRegionName: 'canadacentral',
      location: 'CA Central',
      effectiveStartDate: '2021-10-01T00:00:00Z',
      meterId: '001790af-f893-596a-b4f9-7b0837df43e3',
      meterName: 'D13/DS13 Low Priority',
      productId: 'DZH318Z0BPVW',
      skuId: 'DZH318Z0BPVW/00S8',
      productName: 'Virtual Machines D Series Windows',
      skuName: 'D13 Low Priority',
      serviceName: 'Virtual Machines',
      serviceId: 'DZH313Z7MMC8',
      serviceFamily: 'Compute',
      unitOfMeasure: '1 Hour',
      type: 'Consumption',
      isPrimaryMeterRegion: true,
      armSkuName: 'Standard_D13',
    },
    {
      currencyCode: 'USD',
      tierMinimumUnits: 0,
      retailPrice: 0.155,
      unitPrice: 0.155,
      armRegionName: 'canadacentral',
      location: 'CA Central',
      effectiveStartDate: '2021-10-01T00:00:00Z',
      meterId: '001790af-f893-596a-b4f9-7b0837df43e3',
      meterName: 'D13/DS13 Low Priority',
      productId: 'DZH318Z0BPVW',
      skuId: 'DZH318Z0BPVW/00S8',
      productName: 'Virtual Machines D Series Windows',
      skuName: 'D13 Low Priority',
      serviceName: 'Virtual Machines',
      serviceId: 'DZH313Z7MMC8',
      serviceFamily: 'Compute',
      unitOfMeasure: '1 Hour',
      type: 'DevTestConsumption',
      isPrimaryMeterRegion: true,
      armSkuName: 'Standard_D13',
    },
    {
      currencyCode: 'USD',
      tierMinimumUnits: 0,
      retailPrice: 0.456,
      unitPrice: 0.456,
      armRegionName: 'canadacentral',
      location: 'CA Central',
      effectiveStartDate: '2021-10-01T00:00:00Z',
      meterId: '001790af-f893-596a-b4f9-7b0837df43e3',
      meterName: 'DS13 Low Priority',
      productId: 'DZH318Z0BPW4',
      skuId: 'DZH318Z0BPW4/00SB',
      productName: 'Virtual Machines DS Series Windows',
      skuName: 'DS13 Low Priority',
      serviceName: 'Virtual Machines',
      serviceId: 'DZH313Z7MMC8',
      serviceFamily: 'Compute',
      unitOfMeasure: '1 Hour',
      type: 'Consumption',
      isPrimaryMeterRegion: false,
      armSkuName: 'Standard_DS13',
    },
  ],
  NextPageLink: 'https://prices.azure.com:443/api/retail/prices?$skip=200',
  Count: 100,
};

@Injectable()
export class ProductHelperService {
  constructor(
    @InjectPinoLogger(ProductHelperService.name)
    private readonly logger: PinoLogger,
  ) {}

  // To be called for each page or file to creat product list that will be stored in DB
  parseProductInPage(payload: any): ProductDto[] {
    const products: ProductDto[] = [];
    const azureRetail = plainToClass(AzureRetail, jsonDataLoad);
    this.logger.debug(`completed parsing payload as ${azureRetail}`);
    azureRetail.Items.forEach((item) => {
      const product = new ProductDto();
      product.sku = this.getSku(item);
      product.
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
