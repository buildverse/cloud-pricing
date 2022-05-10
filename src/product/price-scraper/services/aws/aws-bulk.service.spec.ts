import { Test, TestingModule } from '@nestjs/testing';
import { AwsBulkService } from './aws-bulk.service';

describe('AwsBulkService', () => {
  let service: AwsBulkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsBulkService],
    }).compile();

    service = module.get<AwsBulkService>(AwsBulkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
