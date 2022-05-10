import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMPTY, expand, map, Observable } from 'rxjs';
import { GCPService } from '../../../dto/gcp/gcp-service.dto';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GCPServiceRequestProcessor {
  services: GCPService[] = [];
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GCPServiceRequestProcessor.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {}

  fetchFiles(url: string): Observable<{ data: string; nextPageToken: string }> {
    let nextPageParam = '';
    let pageNumber = 1;
    const nextPageToken = '';
    if (nextPageToken) {
      nextPageParam = `&pageToken=${nextPageToken}`;
    }
    const currentPageLink = `${url}/services?key=${this.configService.get(
      'GCP_API_KEY',
    )}${nextPageParam}`;
    return this.fetchFile(currentPageLink, pageNumber).pipe(
      expand((response) => {
        if (response.nextPageToken !== '') {
          return this.fetchFile(response.nextPageToken, pageNumber++);
        } else {
          return EMPTY;
        }
      }),
    );
  }

  private fetchFile(
    currentLink: string,
    pageNumber: number,
  ): Observable<{ data: string; nextPageToken: string }> {
    this.logger.info(
      `Getting data for link ${currentLink} and page ${pageNumber}`,
    );
    return this.httpService.get(currentLink).pipe(
      map((response) => {
        response.data.services.map((service) =>
          this.services.push(plainToInstance(GCPService, service)),
        );
        this.logger.debug(`service is  ${this.services.length}`);
        return {
          data: response.data as string,
          nextPageToken: response.data.nextPageToken as string,
        };
      }),
    );
  }

  private getURL(url: string, derviceDescription?): string {

  }
  fetchServices(url: string): void {
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
  }
}
