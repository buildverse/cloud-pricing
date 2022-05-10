import { Test, TestingModule } from '@nestjs/testing';
import { AzureRetailService } from './azure-retail.service';

describe('AzureRetailService', () => {
  let service: AzureRetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureRetailService],
    }).compile();

    service = module.get<AzureRetailService>(AzureRetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should u')
});
