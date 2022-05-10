import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { GCPService } from 'src/product/dto/gcp/gcp-service.dto';

@Injectable()
export class GcpCatalogService {
  baseUrl = 'https://cloudbilling.googleapis.com/v1';
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GcpCatalogService.name)
    private readonly logger: PinoLogger,
  ) {}

  getService(): Promise<GCPService> {
    const nextPageToken = '';
    const services: GCPService[] = [];
    do {
      let nextPageParam = '';
      if (nextPageToken) {
        nextPageParam = `&pageToken=${nextPageToken}`;
      }
      const resp = await this.httpService.get(
        `${this.baseUrl}/services?key=${config.gcpApiKey}${nextPageParam}`,
      );
      services.push(...(<ServiceJson[]>resp.data.services));
      nextPageToken = resp.data.nextPageToken;
    } while (nextPageToken);
    return services;
  }
}
