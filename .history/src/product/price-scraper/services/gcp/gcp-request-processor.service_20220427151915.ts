import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMPTY, expand, map, Observable } from 'rxjs';
import { GCPService } from '../../../dto/gcp/gcp-service.dto';
import { boolean } from 'joi';

@Injectable()
export class GCPRequestProcessor {
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GCPRequestProcessor.name)
    private readonly logger: PinoLogger,
  ) {}

  fetchAllFiles(url: string): Observable<{ data: string; link: string }> {
    let currentPageLink: string | null = null;
    let pageNumber = 1;
    if (!currentPageLink) {
      currentPageLink = `${url}`;
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
    getServices?: boolean,
  ): Observable<{ data: string; link: string }> | GCPService[] {
    this.logger.info(`Getting data for link ${currentLink}`);
    const services: GCPService[] = [];
    return this.httpService.get(currentLink).pipe(
      map((response) => {
        if (getServices === true) {
            services.push(response)
        } else {
          const filename = `${__dirname}/azuredata/az-retail-page-${pageNumber}.json`;
          // this.persistFiles(filename, JSON.stringify(response.data));
        }
        return {
          data: response.data as string,
          link: response.data.NextPageLink as string,
        };
      }),
    );
  }
}
