import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductHelperService } from '../product-helper/product-helper.service';
import { ProductService } from '../product.service';
import { AwsBulkService } from './services/aws-bulk.service';
import { AwsSpotService } from './services/aws-spot.service';
import { AzureRetailService } from './services/azure-retail.service';
import { GcpCatalogService } from './services/gcp-catalog.service';
import { GcpMachineTypesService } from './services/gcp-machine-types.service';

@Module({
  imports: [HttpModule, ConfigModule, Prod],
  providers: [
    AwsBulkService,
    AwsSpotService,
    GcpCatalogService,
    GcpMachineTypesService,
    AzureRetailService,
    ProductService,
    ProductHelperService
  ],
})
export class PriceScraperModule {}
