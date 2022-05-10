import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AzureRetailService {
  constructor(
    private readonly logger: Logger,
    private httpService: HttpService,
  ) {}

  getAzureRetailPrices()
}
