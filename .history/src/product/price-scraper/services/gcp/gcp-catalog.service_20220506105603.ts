import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { from, map, mergeMap, Observable, of } from 'rxjs';
import { GCPService } from 'src/product/dto/gcp/gcp-service.dto';
import { GCPServiceRequestProcessor } from './gcp-service-request-processor.service';

@Injectable()
export class GcpCatalogService {
  baseUrl = 'https://cloudbilling.googleapis.com/v1';
  services$: Observable<GCPService[]>;
  constructor(
    @InjectPinoLogger(GcpCatalogService.name)
    private readonly logger: PinoLogger,
    private readonly gcpServiceRequestProcessor: GCPServiceRequestProcessor,
  ) {}

  @Cron(new Date(Date.now() + 10 * 1000))
  private getGCPCatalogueData(): void {
    this.logger.info('Caaling service method');
    this.gcpServiceRequestProcessor
      .fetchData(this.baseUrl, false)
      .pipe(
        map((data) => console.log(`data is `)
          /*from(data).pipe(
            mergeMap((service) =>
              this.gcpServiceRequestProcessor.fetchData(
                this.baseUrl,
                true,
                service.serviceId,
              ),
            ),
          ),*/
        ),
      )
      .subscribe((item) => console.log(item));
  }
}
