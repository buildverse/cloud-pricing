import { Test, TestingModule } from '@nestjs/testing';
import { getLoggerToken } from 'nestjs-pino';
import { Constants } from '../../constants';
import { Product } from '../model/product';
import { ProductHelperService } from './product-helper.service';
import { ProductTestHelper } from '../../../test/product.helper.test';

describe('ProductHelperService', () => {
  let service: ProductHelperService;
  let helper: ProductTestHelper;

  const jsonDataLoad = {
    BillingCurrency: 'USD',
    CustomerEntityId: 'Default',
    CustomerEntityType: 'Retail',
    Items: [
      {
        currencyCode: 'USD',
        tierMinimumUnits: 0,
        retailPrice: 0.145125,
        unitPrice: 0.145125,
        armRegionName: 'southindia',
        location: 'IN South',
        effectiveStartDate: '2022-04-01T00:00:00Z',
        meterId: '001752ab-2e87-599e-8fac-f1ada637ca61',
        meterName: 'D5 v2/DS5 v2 Spot',
        productId: 'DZH318Z0BQ34',
        skuId: 'DZH318Z0BQ34/02JJ',
        productName: 'Virtual Machines Dv2 Series',
        skuName: 'D5 v2 Spot',
        serviceName: 'Storage',
        serviceId: 'DZH313Z7MMC8',
        serviceFamily: 'Compute',
        unitOfMeasure: '1 Hour',
        type: 'Consumption',
        isPrimaryMeterRegion: true,
        armSkuName: 'Standard_D5_v2',
      },
      {
        currencyCode: 'USD',
        tierMinimumUnits: 0,
        retailPrice: 0.456,
        unitPrice: 0.456,
        armRegionName: 'canadacentral',
        location: 'CA Central',
        effectiveStartDate: '2021-10-01T00:00:00Z',
        meterId: '001790af-f893-596a-b4f9-7b0837df43e3',
        meterName: 'D13/DS13 Low Priority',
        productId: 'DZH318Z0BPVW',
        skuId: 'DZH318Z0BPVW/00S8',
        productName: 'Virtual Machines D Series Windows',
        skuName: 'D13 Low Priority',
        serviceName: 'Virtual Machines',
        serviceId: 'DZH313Z7MMC8',
        serviceFamily: 'Compute',
        unitOfMeasure: '1 Hour',
        type: 'Consumption',
        isPrimaryMeterRegion: true,
        armSkuName: 'Standard_D13',
      },
      {
        currencyCode: 'USD',
        tierMinimumUnits: 0,
        retailPrice: 0.155,
        unitPrice: 0.155,
        armRegionName: 'canadacentral',
        location: 'CA Central',
        effectiveStartDate: '2021-10-01T00:00:00Z',
        meterId: '001790af-f893-596a-b4f9-7b0837df43e3',
        meterName: 'D13/DS13 Low Priority',
        productId: 'DZH318Z0BPVW',
        skuId: 'DZH318Z0BPVW/00S8',
        productName: 'Virtual Machines D Series Windows',
        skuName: 'D13 Low Priority',
        serviceName: 'Virtual Machines',
        serviceId: 'DZH313Z7MMC8',
        serviceFamily: 'Compute',
        unitOfMeasure: '1 Hour',
        type: 'DevTestConsumption',
        isPrimaryMeterRegion: true,
        armSkuName: 'Standard_D13',
      },
      {
        currencyCode: 'USD',
        tierMinimumUnits: 0,
        retailPrice: 0.456,
        unitPrice: 0.456,
        armRegionName: 'canadacentral',
        location: 'CA Central',
        effectiveStartDate: '2021-10-01T00:00:00Z',
        meterId: '001790af-f893-596a-b4f9-7b0837df43e3',
        meterName: 'DS13 Low Priority',
        productId: 'DZH318Z0BPW4',
        skuId: 'DZH318Z0BPW4/00SB',
        productName: 'Virtual Machines DS Series Windows',
        skuName: 'DS13 Low Priority',
        serviceName: 'Virtual Machines',
        serviceId: 'DZH313Z7MMC8',
        serviceFamily: 'Compute',
        unitOfMeasure: '1 Hour',
        type: 'Consumption',
        isPrimaryMeterRegion: false,
        armSkuName: 'Standard_DS13',
      },
    ],
    NextPageLink: 'https://prices.azure.com:443/api/retail/prices?$skip=200',
    Count: 100,
  };

  const mockLogger = () => ({
    info: jest.fn(),
    debug: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductHelperService,
        {
          provide: getLoggerToken(ProductHelperService.name),
          useFactory: mockLogger,
        },
        ProductTestHelper,
      ],
    }).compile();

    service = module.get<ProductHelperService>(ProductHelperService);
    helper = module.get<ProductTestHelper>(ProductTestHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create product entity from json payload', () => {
    const createdProducts = service.parseProductInPage(jsonDataLoad);
    expect(createdProducts.length).toBe(4);
    const products = [];
    jsonDataLoad.Items.forEach((item) => {
      const product = new Product();
      product.vendorName = Constants.AZURE;
      product.productFamily = item.serviceFamily;
      product.vendorName = 'azure';
      product.sku = helper.getSku(item);
      product.region = item.armRegionName || null;
      products.push(product);
    });
    console.log('Created Products is '+ createdProducts);
    expect(createdProducts).toEqual(products);
    /*expect(service.product.service).toBe(jsonDataLoad.Items[0].serviceName);
    expect(service.product.region).toBe(jsonDataLoad.Items[0].armRegionName);*/
  });
});
