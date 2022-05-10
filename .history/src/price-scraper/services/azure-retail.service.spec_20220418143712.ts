import { Test, TestingModule } from '@nestjs/testing';
import { getLoggerToken } from 'nestjs-pino';
import { AzureRetailService } from './azure-retail.service';

describe('AzureRetailService', () => {
  let service: AzureRetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AzureRetailService,
        {
          provide: getLoggerToken(AzureRetailService.name),
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<AzureRetailService>(AzureRetailService);
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
