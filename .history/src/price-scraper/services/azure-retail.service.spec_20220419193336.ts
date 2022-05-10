import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getLoggerToken } from 'nestjs-pino';
import { of } from 'rxjs';
import { AzureRetailService } from './azure-retail.service';
import { AxiosResponse } from 'axios';

const mockHttpService = () => ({
  get: jest.fn(),
});
const mockLogger = () => ({
  info: jest.fn(),
  debug: jest.fn(),
});

jest.mock('fs', () => ({
  writeFile: jest.fn(),
  readFile: jest.fn(),

  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

const fs = require('fs');

const resultFromLastPage: AxiosResponse = {
  data: {
    BillingCurrency: 'USD',
    CustomerEntityId: 'Default',
    CustomerEntityType: 'Retail',
    Items: [
      { productdetail1: 'detail1', productdetail2: 'detail2' },
      { productdetail1: 'detail1', productdetail2: 'detail2' },
    ],
    NextPageLink: null,
    Count: 2,
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

const result: AxiosResponse = {
  data: {
    BillingCurrency: 'USD',
    CustomerEntityId: 'Default',
    CustomerEntityType: 'Retail',
    Items: [
      { productdetail1: 'detail1', productdetail2: 'detail2' },
      { productdetail1: 'detail1', productdetail2: 'detail2' },
    ],
    NextPageLink: 'https://prices.azure.com:443/api/retail/prices?$skip=200',
    Count: 2,
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
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

  it('should write files to directory on fetching data from service that returns only one page ', () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => of(resultFromLastPage));
    jest.spyOn(fs, 'writeFile');
    service.downloadAzureRetialFiles();
    expect(httpService.get).toHaveBeenCalledTimes(1);
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
  });

  it('should write files to directory on fetching data from service that returns multiple pages ', () => {
    jest.spyOn(httpService, 'get').mockImplementation(() => of(result));
    /*jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => of(resultFromLastPage));*/
    jest.spyOn(fs, 'writeFile');
    service.downloadAzureRetialFiles();
    expect(httpService.get).toHaveBeenCalledTimes(2);
    expect(fs.writeFile).toHaveBeenCalledTimes(2);
  });
});
