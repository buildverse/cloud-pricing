import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { GCPRequestProcessor } from './gcp-request-processor.service';

@Injectable()
export class GcpCatalogService {
  baseUrl = 'https://cloudbilling.googleapis.com/v1';
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GcpCatalogService.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
    private readonly gcpRequestProcessor: GCPRequestProcessor,
  ) {}

  getServices(): void {
    let nextPageParam = '';
    if (nextPageToken) {
      nextPageParam = `&pageToken=${nextPageToken}`;
    }
    const serviceUrl = `${this.baseUrl}/services?key=${this.configService.get(
      'GCP_API_KEY',
    )}${nextPageParam}`;
    this.gcpRequestProcessor
      .getServices(this.baseUrl)
      .subscribe((data) => this.logger.debug(`services are ${data}`));
  }
}