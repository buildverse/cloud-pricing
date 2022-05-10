import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ProductMapper } from '../mappers/product.mapper';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectPinoLogger(ProductService.name)
    private readonly logger: PinoLogger,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProducts(productDto: ProductDto[]): Promise<Product[] | Error> {
    try {
      return await this.productRepository.save(
        this.fromDTOtoEntity(productDto),
      );
    } catch (err) {
      console.log('Error in service code is ' + JSON.stringify(err));
      this.logger.error('Error on saving data', err);
      throw err;;
    }
  }

  private fromDTOtoEntity(productDtos: ProductDto[]): Product[] {
    this.logger.debug(`DTO products as ${JSON.stringify(productDtos)}`);
    const products: Product[] = [];
    productDtos.forEach((dto) => {
      products.push(ProductMapper.fromDTOToEntity(dto));
    });
    this.logger.debug(`Returning products as ${JSON.stringify(products)}`);
    return products;
  }
}
