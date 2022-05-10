import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { plainToInstance } from 'class-transformer';
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
    const serviceArray: GCPService[] = [];
    this.gcpServiceRequestProcessor
      .fetchData(this.baseUrl, false)
      .pipe(
        map((services) => {
          const serviceData = plainToInstance(GCPService, services.data, {
            excludeExtraneousValues: true,
          });
          serviceArray.push(serviceData);
          //console.log(serviceArray[0]);
          /* from(serviceData).pipe(
            mergeMap((service) =>
              this.gcpServiceRequestProcessor.fetchData(
                this.baseUrl,
                true,
                service.serviceId,
              ),
            ),
          ),*/
        }),
      ).pipe(from (serviceArray[0]).pipe(mergeMap))
      .subscribe((item) => console.log(item));
  }
}
