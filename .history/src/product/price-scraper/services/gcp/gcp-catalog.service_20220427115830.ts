import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { GCPService } from 'src/product/dto/gcp/gcp-service.dto';

@Injectable()
export class GcpCatalogService {
  baseUrl = 'https://cloudbilling.googleapis.com/v1';
  constructor(
    httpService: HttpService,
    @InjectPinoLogger(GcpCatalogService.name)
    private readonly logger: PinoLogger,
  ) {}

  getService(): Promise<GCPService> {
    const nextPageToken = '';
    const services: GCPService[] = [];
  }
}
