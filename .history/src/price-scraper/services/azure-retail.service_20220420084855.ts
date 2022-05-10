import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMPTY, expand, map, Observable } from 'rxjs';

@Injectable()
export class AzureRetailService {
  baseUrl = 'https://prices.azure.com/api/retail/prices';
  reservationTermMapping: { [key: string]: string } = {
    '1 Year': '1 yr',
    '3 Years': '3 yr',
    '5 Years': '5 yr',
  };

  pageNumber = 1;

  constructor(
    @InjectPinoLogger(AzureRetailService.name)
    private readonly logger: PinoLogger,
    private httpService: HttpService,
  ) {
    this.logger.info('Initialized Azure retail service');
    this.logger.debug(`Dir path is ${__dirname}`);
    this.createDataDir();
  }

  private createDataDir() {
    if (!fs.existsSync(__dirname + '/azuredata')) {
      fs.mkdirSync(__dirname + '/azuredata');
      this.logger.info('Azure data diectory created');
    } else {
      this.logger.info('Azure data directory exists');
    }
  }

  private fetchFile(
    currentLink: string,
    pageNumber: number,
  ): Observable<{ data: string; link: string }> {
    this.logger.debug(`Getting data for link ${currentLink}`);
    return this.httpService.get(currentLink).pipe(
      map((response) => {
        const filename = `${__dirname}/azuredata/az-retail-page-${pageNumber}.json`;
        fs.writeFile(filename, JSON.stringify(response.data), (err) => {
          if (err) {
            this.logger.error(
              `Error downloading Azure file ${filename} from Azure`,
              err.stack,
            );
          } else {
            this.logger.debug(`${filename} written successfully`);
          }
        });
        return {
          data: response.data as string,
          link: response.data.NextPageLink as string,
        };
      }),
    );
  }

  private fetchAllFiles(): Observable<{ data: string; link: string }> {
    let currentPageLink: string | null = null;
    let pageNumber = 1;
    if (!currentPageLink) {
      currentPageLink = `${this.baseUrl}`;
    }
    return this.fetchFile(currentPageLink, pageNumber).pipe(
      expand((response) => {
        return response.link
          ? this.fetchFile(response.link, pageNumber++)
          : EMPTY;
      }),
    );
  }

  downloadAzureRetialFiles() {
    this.fetchAllFiles().subscribe((x) => this.logger.debug(x.link));
  }
}
