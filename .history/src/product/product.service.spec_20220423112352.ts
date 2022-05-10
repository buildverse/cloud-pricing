import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getLoggerToken } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  const productDto: ProductDto[] = [
    {
      vendorName: 'azure',
      productFamily: 'Compute',
      sku: 'DZH318Z0BQ34/02JJ/001752ab-2e87-599e-8fac-f1ada637ca61',
      region: 'southindia',
      service: 'Compute',
      attributes: {
        effectiveStartDate: '2022-04-01T00:00:00Z',
        productId: 'DZH318Z0BQ34',
        productName: 'Virtual Machines Dv2 Series',
        serviceId: 'DZH313Z7MMC8',
        serviceFamily: 'Compute',
        skuName: 'D5 v2 Spot',
        armSkuName: 'Standard_D5_v2',
        meterId: '001752ab-2e87-599e-8fac-f1ada637ca61',
        meterName: 'D5 v2/DS5 v2 Spot',
      },
      prices: [
        {
          purchaseOption: 'Spot',
          unit: '1 Hour',
          USD: '0.145125',
          effectiveDateStart: '2022-04-01T00:00:00Z',
          startUsageAmount: '0',
          priceHash: '',
        },
      ],
    },
    {
      vendorName: 'azure',
      productFamily: 'Compute',
      sku: 'DZH318Z0BPVW/Standard_D13/001790af-f893-596a-b4f9-7b0837df43e3',
      region: 'canadacentral',
      service: 'Compute',
      attributes: {
        effectiveStartDate: '2021-10-01T00:00:00Z',
        productId: 'DZH318Z0BPVW',
        productName: 'Virtual Machines D Series Windows',
        serviceId: 'DZH313Z7MMC8',
        serviceFamily: 'Compute',
        skuName: 'D13 Low Priority',
        armSkuName: 'Standard_D13',
        meterId: '001790af-f893-596a-b4f9-7b0837df43e3',
        meterName: 'D13/DS13 Low Priority',
      },
      prices: [
        {
          purchaseOption: 'Low Priority',
          unit: '1 Hour',
          USD: '0.456',
          effectiveDateStart: '2021-10-01T00:00:00Z',
          startUsageAmount: '0',
          priceHash: '',
        },
      ],
    },
    {
      vendorName: 'azure',
      productFamily: 'Compute',
      sku: 'DZH318Z0BPVW/Standard_D13/001790af-f893-596a-b4f9-7b0837df43e3',
      region: 'canadacentral',
      service: 'Compute',
      attributes: {
        effectiveStartDate: '2021-10-01T00:00:00Z',
        productId: 'DZH318Z0BPVW',
        productName: 'Virtual Machines D Series Windows',
        serviceId: 'DZH313Z7MMC8',
        serviceFamily: 'Compute',
        skuName: 'D13 Low Priority',
        armSkuName: 'Standard_D13',
        meterId: '001790af-f893-596a-b4f9-7b0837df43e3',
        meterName: 'D13/DS13 Low Priority',
      },
      prices: [
        {
          purchaseOption: 'Low Priority',
          unit: '1 Hour',
          USD: '0.155',
          effectiveDateStart: '2021-10-01T00:00:00Z',
          startUsageAmount: '0',
          priceHash: '',
        },
      ],
    },
    {
      vendorName: 'azure',
      productFamily: 'Compute',
      service: 'Compute',
      sku: 'DZH318Z0BPW4/Standard_DS13/001790af-f893-596a-b4f9-7b0837df43e3',
      region: 'canadacentral',
      attributes: {
        effectiveStartDate: '2021-10-01T00:00:00Z',
        productId: 'DZH318Z0BPW4',
        productName: 'Virtual Machines DS Series Windows',
        serviceId: 'DZH313Z7MMC8',
        serviceFamily: 'Compute',
        skuName: 'DS13 Low Priority',
        armSkuName: 'Standard_DS13',
        meterId: '001790af-f893-596a-b4f9-7b0837df43e3',
        meterName: 'DS13 Low Priority',
      },
      prices: [
        {
          purchaseOption: 'Low Priority',
          unit: '1 Hour',
          USD: '0.456',
          effectiveDateStart: '2021-10-01T00:00:00Z',
          startUsageAmount: '0',
          priceHash: '',
        },
      ],
    },
  ];

  const mockLogger = () => ({
    info: jest.fn(),
    debug: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getLoggerToken(ProductService.name),
          useFactory: mockLogger,
        },
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sucessfully save data to Database ', async () => {
    const product: Product[] = [];
    const saveWithoutError = jest
      .spyOn(repository, 'save')
      .mockImplementation(() => Promise.resolve(product as any));
    const result = await service.createProducts(productDto);
    expect(result).not.toBeNull();
    expect(saveWithoutError).toHaveBeenCalledTimes(1);
  });

  it('should sucessfully handle error if save failed to Database ', async () => {
    const product: Product[] = [];
    let result;
    const saveWithoutError = jest
      .spyOn(repository, 'save')
      .mockImplementation(() => Promise.reject('error'));
      try {
        result = await service.createProducts(productDto);
      } cathc(e)
    
    expect(result).toBeNull();
    expect(saveWithoutError).toHaveBeenCalledTimes(1);
  });
});
