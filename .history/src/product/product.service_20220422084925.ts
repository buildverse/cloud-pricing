import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    constructor(  @InjectPinoLogger(ProductHelperService.name)
    private readonly logger: PinoLogger,)
}
