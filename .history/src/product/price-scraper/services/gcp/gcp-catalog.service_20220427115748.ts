import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { GCPService } from 'src/product/dto/gcp/gcp-service.dto';

@Injectable()
export class GcpCatalogService {
  constructor(
    httpService: HttpService,
    @InjectPinoLogger(GcpCatalogService.name)
    private readonly logger: PinoLogger,
  ) {}

  getService(): Promise<GCPService> {
      let nextPageToken = '';
      const services:  GCPService[];
  }
}
