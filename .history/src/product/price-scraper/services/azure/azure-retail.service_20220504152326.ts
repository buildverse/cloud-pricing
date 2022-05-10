import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMPTY, expand, map, Observable } from 'rxjs';
import { ProductService } from '../../../product.service';
import { ProductHelperService } from '../../../product-helper/product-helper.service';
import { ProductDto } from '../../../dto/product.dto';

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
    private producService: ProductService,
    private configService: ConfigService,
    private productHelperService: ProductHelperService,
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
  /**
   *
   * @param currentLink
   * @param pageNumber
   * @returns  Observable<{ data: string; link: string }>
   *
   * Move file storage to google files store
   */
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

  persistFiles(filename: string, data: string): void {
    const saveToStorage: boolean = this.configService.get(
      'SAVE_CLOUD_PRICE_FILES_TO_STORAGE',
    );
    this.logger.info(`Saving to storage : ${saveToStorage}`);
    if (saveToStorage === true) {
      this.persisteFilesToStore(filename, data);
    } else {
      this.persistDataToDB(data);
    }
  }

  private persisteFilesToStore(filename: string, data: string): void {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        this.logger.error(
          `Error downloading Azure file ${filename} from Azure`,
          err.stack,
        );
      } else {
        this.logger.info(`${filename} written successfully`);
      }
    });
  }

  private persistDataToDB(data: string): void {
    console.log('Am persisting to DB');
    this.logger.info('Storing info to DB directly');
    const productDtos: ProductDto[] =
      this.productHelperService.parseProductInPage(data);

    this.producService.createProducts(productDtos);
    this.logger.info('Stored to DB.');
  }

  private fetchAllFiles(): Observable<{ data: string; link: string }> {
    let currentPageLink: string | null = null;
    let pageNumber = 1;
    if (!currentPageLink) {
      currentPageLink = `${this.baseUrl}`;
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

  //@Cron(new Date(Date.now() + 10 * 1000))
  @Cron(CronExpression.EVERY_30_SECONDS)
  downloadAzureRetialFiles() {
    this.logger.debug('Call Azure');
  //  this.fetchAllFiles().subscribe((x) => this.logger.debug(x.link));
  }
}
