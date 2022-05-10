import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [AwsBulkService,
    AwsSpotService,
    GcpCatalogService,
    GcpMachineTypesService,
    AzureRetailService,]
})
export class PriceScraperModule {}
