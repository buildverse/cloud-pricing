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
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  createProducts(productDto: ProductDto[]) {
    //this.productRepository.save()
  }

  private fromDTOtoEntity(productDtos: ProductDto[]): Product[] {
    const products: Product[] = [];
    productDtos.forEach(dto => {
        products.push(ProductMapper.)
    })
  }
}
