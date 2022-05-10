import { Test, TestingModule } from '@nestjs/testing';
import { GcpCatalogService } from './gcp-catalog.service';

describe('GcpCatalogService', () => {
  let service: GcpCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcpCatalogService],
    }).compile();

    service = module.get<GcpCatalogService>(GcpCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
