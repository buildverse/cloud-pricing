import { Test, TestingModule } from '@nestjs/testing';
import { getLoggerToken } from 'nestjs-pino';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  const mockLogger = () => ({
    info: jest.fn(),
    debug: jest.fn(),
  });

  const moc

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getLoggerToken(ProductService.name),
          useFactory: mockLogger,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
