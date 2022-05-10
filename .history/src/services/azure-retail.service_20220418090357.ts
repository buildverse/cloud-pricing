import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const baseUrl = 'https://prices.azure.com/api/retail/prices';

const reservationTermMapping: { [key: string]: string } = {
    '1 Year': '1 yr',
    '3 Years': '3 yr',
    '5 Years': '5 yr',
  };
  

@Injectable()
export class AzureRetailService {
  constructor(
    private readonly logger: Logger,
    private httpService: HttpService,
  ) {}

  getAzureRetailPrices()
}
