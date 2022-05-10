import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzurePage } from 'src/models/azure-page';

@Injectable()
export class AzureRetailService {
  baseUrl = 'https://prices.azure.com/api/retail/prices';
  reservationTermMapping: { [key: string]: string } = {
    '1 Year': '1 yr',
    '3 Years': '3 yr',
    '5 Years': '5 yr',
  };

  constructor(
    @InjectPinoLogger(AzureRetailService.name)
    private readonly logger: PinoLogger,
    private httpService: HttpService,
  ) {
    this.logger.info('Initialized Azure retail service');
  }

  downloadPrices() {
    const pages: AzurePage[] = [];

    let currentPageLink: string | null = null;
    let pageNumeber = 1;

    do {
      if(!currentPageLink) {
        currentPageLink = `${this.baseUrl}`
      }
    }
  }
}
