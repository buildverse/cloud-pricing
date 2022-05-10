import { HttpService, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMPTY, expand, Observable } from 'rxjs';

@Injectable()
export class FileFetcher {
  constructor(private readonlyhttpService: HttpService, 
    @InjectPinoLogger(FileFetcher.name)
  private readonly logger: PinoLogger,) {}

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
  ): Observable<{ data: string; link: string }> {
    this.logger.info(`Getting data for link ${currentLink}`);
    return this.httpService.get(currentLink).pipe(
      map((response) => {
        const filename = `${__dirname}/azuredata/az-retail-page-${pageNumber}.json`;
        this.persistFiles(filename, JSON.stringify(response.data));
        return {
          data: response.data as string,
          link: response.data.NextPageLink as string,
        };
      }),
    );
  }
}
