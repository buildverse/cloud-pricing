import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AwsSpotService } from './services/aws-spot.service';
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
