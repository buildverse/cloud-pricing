import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMPTY, expand, map, Observable } from 'rxjs';

@Injectable()
export class GCPRequestProcessor {
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(FileFetcher.name)
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
    inMemory?: boolean,
  ): Observable<{ data: string; link: string }> {
    this.logger.info(`Getting data for link ${currentLink}`);
    return this.httpService.get(currentLink).pipe(
      map((response) => {
        const filename = `${__dirname}/azuredata/az-retail-page-${pageNumber}.json`;
        // this.persistFiles(filename, JSON.stringify(response.data));
        return {
          data: response.data as string,
          link: response.data.NextPageLink as string,
        };
      }),
    );
  }
}
