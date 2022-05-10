import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getLoggerToken, PinoLogger } from 'nestjs-pino';
import { AzureRetailService } from './azure-retail.service';

jest.mock('nestjs-pino');

const mockHttpService = () => ({});

describe('AzureRetailService', () => {
  let service: AzureRetailService;
  let configService: ConfigService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AzureRetailService,
        {
          provide: ConfigService,
          useFactory: mockConfiService,
        },
        { provide: HttpService, useFactory: mockHttpService },
      ],
    }).compile();

    service = module.get<AzureRetailService>(AzureRetailService);
    //  configService = module.get<ConfigService>(ConfigService);
    //  logger = module.get<PinoLogger>(PinoLogger);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should use the correct baseURl ', () => {
    const baseUrl = 'https://prices.azure.com/api/retail/prices';
    expect(service.baseUrl).toBe(baseUrl);
  });

  it('should use the correct reservation terms', () => {
    const reservationTermMapping: { [key: string]: string } = {
      '1 Year': '1 yr',
      '3 Years': '3 yr',
      '5 Years': '5 yr',
    };
    expect(service.reservationTermMapping).toBe(reservationTermMapping);
  });
});
