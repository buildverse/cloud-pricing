import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMPTY, expand, map, Observable, of, switchMap } from 'rxjs';
import { GCPService } from '../../../dto/gcp/gcp-service.dto';

@Injectable()
export class GCPServiceRequestProcessor {
  services: GCPService[] = [];
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GCPServiceRequestProcessor.name)
    private readonly logger: PinoLogger,
  ) {}

  fetchFiles(
    url: string,
    getServices?: boolean,
  ): Observable<{ data: string; link: string }> {
    let nextPageParam = '';
    const nextPageToken = '';
    if (nextPageToken) {
      nextPageParam = `&pageToken=${nextPageToken}`;
    }
    return this.fetchFile(currentPageLink, pageNumber).pipe(
      expand((response) => {
        if (response.link) {
          return this.fetchFile(response.link, pageNumber++);
        } else {
          return EMPTY;
        }
      }),
    );
  }

  private fetchFile(
    currentLink: string,
    pageNumber: number,
  ): Observable<{ data: string; link: string }> {
    this.logger.info(`Getting data for link ${currentLink}`);
    return this.httpService.get(currentLink).pipe(
      map((response) => {
        this.services.push(response.data);
        return {
          data: response.data as string,
          link: response.data.NextPageLink as string,
        };
      }),
    );
  }

  getServices(url: string): Observable<GCPService[]> {
    url = `${url}/services?key=${config.gcpApiKey}${nextPageParam}`;
    return this.fetchFiles(url, true).pipe(map(() => this.services));
  }
}
