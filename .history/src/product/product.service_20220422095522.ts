import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ProductMapper } from '../mappers/product.mapper';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { ProductHelperService } from './product-helper/product-helper.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectPinoLogger(ProductService.name)
    private readonly logger: PinoLogger,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private readonly productHelperService: ProductHelperService
  ) {}

  /*createProducts(productDto: ProductDto[]) {
    this.productRepository.save(this.fromDTOtoEntity(productDto));
  }*/

  createProducts() {
    this.productRepository.save(this.fromDTOtoEntity(this.productHelperService.parseProductInPage('')));
  }

  private fromDTOtoEntity(productDtos: ProductDto[]): Product[] {
    const products: Product[] = [];
    productDtos.forEach((dto) => {
      products.push(ProductMapper.fromDTOToEntity(dto));
    });
    return products;
  }
}
