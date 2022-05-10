import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from '../product.module';
import { AwsBulkService } from './services/aws/aws-bulk.service';
import { AwsSpotService } from './services/aws/aws-spot.service';
import { GcpCatalogService } from './services/gcp/gcp-catalog.service';
import { GcpMachineTypesService } from './services/gcp/gcp-machine-types.service';


@Module({
  imports: [HttpModule, ConfigModule, ProductModule],
  providers: [
    AwsBulkService,
    AwsSpotService,
    GcpCatalogService,
    GcpMachineTypesService,
    AzureRetailService,
  ],
})
export class PriceScraperModule {}
