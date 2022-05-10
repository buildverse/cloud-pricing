import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectPinoLogger(ProductService.name)
    private readonly logger: PinoLogger,
    private productRepository: Repository<Product>
  ) {}
}
