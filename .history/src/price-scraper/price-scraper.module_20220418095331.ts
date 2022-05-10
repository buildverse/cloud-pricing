import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AwsSpotService } from './services/aws-spot.service';
import { AzureRetailService } from './services/azure-retail.service';
import { GcpCatalogService } from './services/gcp-catalog.service';
import { GcpMachineTypesService } from './services/gcp-machine-types.service';

@Module({
  imports: [HttpModule],
  providers: [AwsBulkService,
    AwsSpotService,
    GcpCatalogService,
    GcpMachineTypesService,
    AzureRetailService,
  ],
})
export class PriceScraperModule {}
