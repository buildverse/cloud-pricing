import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const baseUrl = 'https://prices.azure.com/api/retail/prices';

@Injectable()
export class AzureRetailService {
  constructor(
    private readonly logger: Logger,
    private httpService: HttpService,
  ) {}

  getAzureRetailPrices()
}
