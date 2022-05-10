import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class ProductService {
    constructor(  @InjectPinoLogger(ProductService.name)
    private readonly logger: PinoLogger, )
}
