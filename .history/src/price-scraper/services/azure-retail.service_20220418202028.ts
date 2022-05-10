import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzurePage } from 'src/models/azure-page';
import { string } from 'joi';

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

  downloadPrices() {
    //const pages: AzurePage[] = [];
    this.logger.info('Downloading Azure Prices');

    let currentPageLink: string | null = null;
    let pageNumber = 1;

    do {
      this.('page number in do is'+pageNumber);
      if (!currentPageLink) {
        currentPageLink = `${this.baseUrl}`;
      }

      const filename = `${__dirname}/azuredata/az-retail-page-${pageNumber}.json`;

      this.httpService.get(currentPageLink).subscribe((response) => {
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
  }
}
