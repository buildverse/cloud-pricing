import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GcpCatalogService {

    constructor(httpService: HttpService, @InjectPinoLogger(AzureRetailService.name)
    private readonly logger: PinoLogger,)
}
