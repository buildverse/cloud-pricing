import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { AwsBulkService } from './services/aws-bulk.service';
import { AwsSpotService } from './services/aws-spot.service';
import { AzureRetailService } from './services/azure-retail.service';
import { GcpCatalogService } from './services/gcp-catalog.service';
import { GcpMachineTypesService } from './services/gcp-machine-types.service';

@Module({
  imports: [HttpModule],
  providers: [
    AwsBulkService,
    AwsSpotService,
    GcpCatalogService,
    GcpMachineTypesService,
    AzureRetailService,
    ProductService,
  ],
})
export class PriceScraperModule {}
