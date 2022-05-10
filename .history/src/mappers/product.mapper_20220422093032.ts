import { ProductDto } from 'src/product/dto/product.dto';
import { Product } from 'src/product/entity/product.entity';

export class ProductMapper {
  static fromDTOToEntity(productDTO: ProductDto): Product {
    if (!productDTO) return;
    const product = new Product();
    const fields = Object.getOwnPropertyNames(productDTO);
    fields.forEach((field) => (product[field] = productDTO[field]));
    return product;
  }

  static fromEntityToDTO(product: Product): ProductDto {
    if (!product) return;
    const productDTO = new ProductDto();
    const fields = Object.getOwnPropertyNames(product);
    fields.forEach((field) => (productDTO[field] = product[field]));
    return productDTO;
  }
}
