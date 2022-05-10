import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { GCPService } from 'src/product/dto/gcp/gcp-service.dto';
import { GCPRequestProcessor } from './gcp-request-processor.service';

@Injectable()
export class GcpCatalogService {
  baseUrl = 'https://cloudbilling.googleapis.com/v1';
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(GcpCatalogService.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
    private readonly gcpRequestProcessor: GCPRequestProcessor
  ) {}

  getServices(): Observable<GCPService[]> {
   this.gcpRequestProcessor.getServices(this.baseUrl);
  }
}
