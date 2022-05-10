import { Test, TestingModule } from '@nestjs/testing';
import { GcpMachineTypesService } from './gcp-machine-types.service';

describe('GcpMachineTypesService', () => {
  let service: GcpMachineTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcpMachineTypesService],
    }).compile();

    service = module.get<GcpMachineTypesService>(GcpMachineTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
