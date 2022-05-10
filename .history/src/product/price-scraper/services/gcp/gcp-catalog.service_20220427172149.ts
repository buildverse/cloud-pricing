import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { GCPServiceRequestProcessor } from './gcp-service-request-processor.service';

@Injectable()
export class GcpCatalogService {
  baseUrl = 'https://cloudbilling.googleapis.com/v1';
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GcpCatalogService.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
    private readonly gcpServiceRequestProcessor: GCPServiceRequestProcessor,
  ) {}

  @Cron(new Date(Date.now() + 10 * 1000))
  getServices(): void {
    this.gcpServiceRequestProcessor
      .fetchServices(this.baseUrl);
  }
}
