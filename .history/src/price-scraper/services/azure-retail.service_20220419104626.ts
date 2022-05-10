import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzurePage } from 'src/models/azure-page';
import { string } from 'joi';
import { mergeMap, Observable, of } from 'rxjs';

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

  private fetchPage(
    currentPageLink: string,
  ): Observable<{ status: number; link: any | null }> {
    if (currentPageLink == null) {
      this.logger.info('All data for Azure downloaded');
      return of({ status: 204, link: null });
    } else {
      this.logger.info(`Downloading data for link ${currentPageLink}`);
      this.httpService.get(currentPageLink).
    }
  }

  downloadPrices() {
    //const pages: AzurePage[] = [];
    this.logger.info('Downloading Azure Prices');

    let currentPageLink: string | null = null;
    const pageNumber = 1;
    if (!currentPageLink) {
      currentPageLink = `${this.baseUrl}`;
    }

    this.fetchPage(currentPageLink);
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
    } while (pageNumber <= 3); //while (currentPageLink != null);*/
  }
}
