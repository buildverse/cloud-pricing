import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { GCPService } from 'src/product/dto/gcp/gcp-service.dto';

@Injectable()
export class GcpCatalogService {
  baseUrl = 'https://cloudbilling.googleapis.com/v1';
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GcpCatalogService.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {}

  getService(): Observable<GCPService[]> {
    this.logger.info(`Getting all services for Google Catalogue`);
    const nextPageToken = '';
    const services: GCPService[] = [];
    do {
      let nextPageParam = '';
      if (nextPageToken) {
        nextPageParam = `&pageToken=${nextPageToken}`;
      }
      const resp = this.httpService.get(
        `${this.baseUrl}/services?key=${this.configService.get('GCP').gcpApiKey}${nextPageParam}`,
      );
      services.push(...(<GCPService[]>resp.data.services));
      nextPageToken = resp.data.nextPageToken;
    } while (nextPageToken);
    this.logger.info(`Google Services downloaded`);
    return services;
  }
}
