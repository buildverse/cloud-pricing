import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMPTY, expand, map, Observable, of } from 'rxjs';
import { GCPService } from '../../../dto/gcp/gcp-service.dto';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GCPServiceRequestProcessor {
  services: GCPService[] = [];
  serviceObservable$: Observable<GCPService[]>;
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GCPServiceRequestProcessor.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {}

  fetchData(
    url: string,
    serviceDescription?: boolean,
    serviceId?: string,
  ): Observable<GCPService[]> {
    let nextPageParam = '';
    let pageNumber = 1;
    const nextPageToken = '';
    if (nextPageToken) {
      nextPageParam = `&pageToken=${nextPageToken}`;
    }
    const currentPageLink = `${this.getURL(
      url,
      serviceDescription,
      serviceId,
    )}${nextPageParam}`;
    return this.fetchService(currentPageLink, pageNumber).pipe(
      expand((response) => {
        if (response.nextPageToken !== '') {
          return this.fetchService(response.nextPageToken, pageNumber++);
        } else {
          return EMPTY;
        }
      }),
    );
  }

  private fetchService(
    currentLink: string,
    pageNumber: number,
  ): Observable<any | { data: string; nextPageToken: string }> {
    this.logger.info(
      `Getting data for link ${currentLink} and page ${pageNumber}`,
    );
    return this.httpService.get(currentLink).pipe(
      map((response) => {
        response.data.services.map((service) => {
          this.services.push(
            plainToInstance(GCPService, service, {
              excludeExtraneousValues: true,
            }),
          );
        });
        return {
          data: this.services as string,
          nextPageToken: response.data.nextPageToken as string,
        };
      }),
    );
  }

  private getURL(
    url: string,
    serviceDescription?: boolean,
    serviceId?: string,
  ): string {
    let currentLink;
    if (serviceDescription === true) {
      currentLink = `${url}/services/${serviceId}/skus?key=${this.configService.get(
        'GCP_API_KEY',
      )}`;
    } else {
      currentLink = `${url}/services?key=${this.configService.get(
        'GCP_API_KEY',
      )}`;
    }
    return currentLink;
  }
  /* fetchServices(url: string): void {
    let nextPageParam = '';
    const nextPageToken = '';
    if (nextPageToken) {
      nextPageParam = `&pageToken=${nextPageToken}`;
    }
    const currentPageLink = `${url}/services?key=${this.configService.get(
      'GCP_API_KEY',
    )}${nextPageParam}`;
    this.logger.debug(`URL is ${currentPageLink}`);
    this.httpService
      .get(currentPageLink)
      .subscribe((response) =>
        this.logger.debug(`Repsonse is ${JSON.stringify(response.data)}`),
      );
  }*/
}
