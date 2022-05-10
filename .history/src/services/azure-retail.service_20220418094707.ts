import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

const baseUrl = 'https://prices.azure.com/api/retail/prices';

const reservationTermMapping: { [key: string]: string } = {
  '1 Year': '1 yr',
  '3 Years': '3 yr',
  '5 Years': '5 yr',
};

type ItemsJson = {
  Items: ProductJson[];
  nextPageToken: string;
};

type PageJson = {
  NextPageLink: string;
};

type ProductJson = {
  currencyCode: string;
  tierMinimumUnits: string;
  retailPrice: string;
  unitPrice: string;
  armRegionName: string;
  location: string;
  effectiveStartDate: string;
  meterId: string;
  meterName: string;
  productId: string;
  skuId: string;
  productName: string;
  skuName: string;
  serviceName: string;
  serviceId: string;
  serviceFamily: string;
  unitOfMeasure: string;
  type: string;
  isPrimaryMeterRegion: boolean;
  armSkuName: string;
  reservationTerm: string;
};

@Injectable()
export class AzureRetailService {
  constructor(
    private readonly logger: Logger,
    private httpService: HttpService,
  ) {
    this.logger.log('Initialized logging in Azure retail service');
  }

  //getAzureRetailPrices() {}
}
