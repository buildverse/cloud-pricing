import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AzurePage } from 'src/models/azure-page';

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
  }

  downloadPrices() {
    //const pages: AzurePage[] = [];

    let currentPageLink: string | null = null;
    let pageNumber = 1;

    do {
      if (!currentPageLink) {
        currentPageLink = `${this.baseUrl}`;
      }

      const filename = `data/az-retail-page-${pageNumber}.json`;
      this.httpService.get(currentPageLink).subscribe((response) => {
        fs.writeFile(filename, response.data, (err) => {
          if (err) {
            this.logger.error(
              `Error downloading Azure file ${filename} from Azure`,
            );
          } else {
            this.logger.debug(`${filename}` 
          }
        });
        currentPageLink = response.data.NextPageLink;
      });

      pageNumber += 1;
      //if (pageNumber % 100 === 0) {
      if (pageNumber === 1) {
        this.logger.info(`Downloaded ${pageNumber} pages...`);
      }
    } while (currentPageLink != null);
  }
}
