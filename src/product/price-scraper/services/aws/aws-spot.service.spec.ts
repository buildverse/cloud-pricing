import { Test, TestingModule } from '@nestjs/testing';
import { AwsSpotService } from './aws-spot.service';

describe('AwsSpotService', () => {
  let service: AwsSpotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsSpotService],
    }).compile();

    service = module.get<AwsSpotService>(AwsSpotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
