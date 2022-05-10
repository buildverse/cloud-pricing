import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ProductMapper } from '../mappers/product.mapper';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { ProductHelperService } from './product-helper/product-helper.service';
import { createHmac } from 'crypto';

@Injectable()
export class ProductService {
  constructor(
    @InjectPinoLogger(ProductService.name)
    private readonly logger: PinoLogger,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProducts(productDto: ProductDto[]) {
    try {
      await this.productRepository.save(this.fromDTOtoEntity(productDto));
    } catch(err) {
      
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
