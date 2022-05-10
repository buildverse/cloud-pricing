import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMPTY, expand, map, Observable } from 'rxjs';
import { GCPService } from '../../../dto/gcp/gcp-service.dto';

@Injectable()
export class GCPRequestProcessor {
  services: GCPService[] = [];
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GCPRequestProcessor.name)
    private readonly logger: PinoLogger,
  ) {}

  fetchFiles(
    url: string,
    getServices?: boolean,
  ): Observable<{ data: string; link: string }> {
    let currentPageLink: string | null = null;
    let pageNumber = 1;
    if (!currentPageLink) {
      currentPageLink = `${url}`;
    }
    return this.fetchFile(currentPageLink, pageNumber, getServices).pipe(
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
  ): Observable<{ data: string; link: string }> {
    this.logger.info(`Getting data for link ${currentLink}`);
    return this.httpService.get(currentLink).pipe(
      map((response) => {
        if (getServices === true) {
          this.logger.debug(
            `The dresponse data object is ${JSON.stringify(response.data)}`,
          );
          this.services.push(response.data);
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

  getServices(url: string): GCPService[] {
    this.fetchFiles(url, true).subscribe(services => );
  }
}
