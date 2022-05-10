import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    constructor(  @InjectPinoLogger(ProductService.name)
    private readonly logger: PinoLogger, )
}
