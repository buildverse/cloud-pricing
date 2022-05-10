import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzurePage } from 'src/models/azure-page';
import { string } from 'joi';
import {
  concat,
  defer,
  EMPTY,
  expand,
  from,
  map,
  mergeMap,
  Observable,
  of,
  tap,
  timer,
} from 'rxjs';
import { response } from 'express';

@Injectable()
export class AzureRetailService {
  baseUrl = 'https://prices.azure.com/api/retail/prices';
  reservationTermMapping: { [key: string]: string } = {
    '1 Year': '1 yr',
    '3 Years': '3 yr',
    '5 Years': '5 yr',
  };

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

  fetchFile(currentLink: string): Observable<{ data: string; link: string }> {
    this.logger.debug(`Getting data for link ${currentLink}`);
    return this.httpService.get(currentLink).pipe(
      map((response) => {
        this.logger.debug(`My response is ${response.data.NextPageLink}`);
        fs.writeFile(filename, JSON.stringify(data), (err) => {
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
    const pageNumber = 1;
    if (!currentPageLink) {
      currentPageLink = `${this.baseUrl}`;
    }

    return this.fetchFile(currentPageLink, pageNumber).pipe(
      expand((response) => {
        this.logger.debug(`Fetching for link ${response.link}`);
        return response.link ? this.fetchFile(response.link) : EMPTY;
      }),
    );
  }

  downloadAzureRetialFiles() {
    this.fetchAllFiles().subscribe()
  }

  /*

  private fetchPage(currentLink: string, pageNumber: number) {
    return this.httpService.get(currentLink).pipe(
      tap(() => console.log(`-> fetched page ${pageNumber}`)),
      map((response) => {
        items: response.data;
        nextPage: pageNumber + 1;
      }),
    );
  }
  getFiles = (link: string, page: number) =>
    defer(() => this.fetchPage(link, page)).pipe(
      mergeMap(({ items, nextpage }) => {
        const items$ = from(items);
        const next$ = nextpage ? nextpage + 1 : EMPTY;
        return concat(items$, next$);
      }),
    );
  private generatePageLinks(currentPageLink: string) {
    const links: string[] = [];
    if (!currentPageLink) {
      currentPageLink = `${this.baseUrl}`;
    }
    do {
      this.httpService.get(currentPageLink).subscribe((response) => {
        links.push(response.data.NextPageLink);
      });
    } while (currentPageLink != null);
  }

  downloadPrices() {
    //const pages: AzurePage[] = [];
    this.logger.info('Downloading Azure Prices');

    let currentPageLink: string | null = null;
    const pageNumber = 1;
    if (!currentPageLink) {
      currentPageLink = `${this.baseUrl}`;
    }

    this.fetchPage(currentPageLink);*/
  //this.httpService.get(currentPageLink).
  /*
  
    do {
      this.logger.debug('page number in do is' + pageNumber);
      if (!currentPageLink) {
        currentPageLink = `${this.baseUrl}`;
      }
      this.logger.debug(`Current Link is ${currentPageLink}`);
      const filename = `${__dirname}/azuredata/az-retail-page-${pageNumber}.json`;
  
      this.httpService.get(currentPageLink).subscribe((response) => {
        this.logger.debug('The observable executing');
        const data = response.data;
        fs.writeFile(filename, JSON.stringify(data), (err) => {
          if (err) {
            this.logger.error(
              `Error downloading Azure file ${filename} from Azure`,
              err.stack,
            );
          } else {
            this.logger.debug(`${filename} written successfully`);
          }
        });
        currentPageLink = response.data.NextPageLink;
        this.logger.debug(`Next link is ${currentPageLink}`);
        pageNumber += 1;
        //if (pageNumber % 100 === 0) {
        if (pageNumber <= 3) {
          this.logger.info(`Downloaded ${pageNumber} pages...`);
        }
      });
    } while (pageNumber <= 3); //while (currentPageLink != null);
  }*/
}
