import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { plainToClass, plainToInstance } from 'class-transformer';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { from, map, mergeMap, Observable, of, tap } from 'rxjs';
import { GCPService } from 'src/product/dto/gcp/gcp-service.dto';
import { GCPServiceRequestProcessor } from './gcp-service-request-processor.service';

@Injectable()
export class GcpCatalogService {
  baseUrl = 'https://cloudbilling.googleapis.com/v1';
  constructor(
    @InjectPinoLogger(GcpCatalogService.name)
    private readonly logger: PinoLogger,
    private readonly gcpServiceRequestProcessor: GCPServiceRequestProcessor,
  ) {}

  @Cron(new Date(Date.now() + 10 * 1000))
  private getGCPCatalogueData(): void {
    this.logger.info('Caaling service method');
    let serviceArray: GCPService[] = [];
    let something;
    this.gcpServiceRequestProcessor
      .fetchData(this.baseUrl, false)
      .pipe(
        map((services) => {
          serviceArray = [
            ...serviceArray,
            plainToClass(GCPService, services.data, {
              excludeExtraneousValues: true,
            }),
          ];
          console.log('Service array is '+ ser)
          something = serviceArray[0];
        }),
      )
      .pipe(map((_) => something))
      .pipe(tap((service) => console.log('servuce is ', service[0].serviceId)))
      .pipe(
        mergeMap((service) =>
          this.gcpServiceRequestProcessor.fetchData(
            this.baseUrl,
            true,
            service[0].serviceId,
          ),
        ),
      )
      .subscribe((data) => console.log(data));

    //.pipe(mergeMap(service => this.gcpServiceRequestProcessor.fetchData(this.baseUrl, true, service.serviceId))))
    /*.pipe( )
        mergeMap((service) =>
          this.gcpServiceRequestProcessor.fetchData(
            this.baseUrl,
            true,
            service.serviceId,
          ),
        ),
      )*/
  }
}
