import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectPinoLogger(ProductService.name)
    private readonly logger: PinoLogger,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  createProducts(product: Product[]) {
      this.
  }
}
