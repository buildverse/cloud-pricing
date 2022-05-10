import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getLoggerToken } from 'nestjs-pino';
import { of } from 'rxjs';
import { AzureRetailService } from './azure-retail.service';

jest.mock('fs');

const mockHttpService = () => ({});
const mockLogger = () => ({
  info: jest.fn(),
  debug: jest.fn(),
});

const result: AxiosResponse = {
  data: 'Components',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};
const jsonResponse = {
  "BillingCurrency": "USD",
  "CustomerEntityId": "Default",
  "CustomerEntityType": "Retail",
  "Items": [
    { productdetail1: 'detail1', productdetail2: 'detail2' },
    { productdetail1: 'detail1', productdetail2: 'detail2' },
  ],
  "NextPageLink": "https://prices.azure.com:443/api/retail/prices?$skip=2",
  "Count": 2
};

describe('AzureRetailService', () => {
  let service: AzureRetailService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AzureRetailService,
        { provide: HttpService, useFactory: mockHttpService },
        {
          provide: getLoggerToken(AzureRetailService.name),
          useFactory: mockLogger,
        },
      ],
    }).compile();

    service = module.get<AzureRetailService>(AzureRetailService);
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
    expect(service.reservationTermMapping).toStrictEqual(
      reservationTermMapping,
    );
  });

  it('should write files to directory on fecthing data from service ', () => {
    const baseUrl = 'https://prices.azure.com/api/retail/prices';
    jest.spyOn(httpService, 'get').mockImplementation(() =>
      of(jsonResponse)
  );
});

