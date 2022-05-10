import { ProductDto } from "src/product/dto/product.dto";
import { Product } from "src/product/entity/product.entity";

export class UserMapper {
    static fromDTOToEntity(productDTO: ProductDto): Product {
      if (!productDTO) return;
      const product = new Product();
      const fields = Object.getOwnPropertyNames(productDTO);
      fields.forEach((field) => (product[field] = productDTO[field]));
      return product;
    }
  
    static fromEntityToDTO(product: Product): ProductDTO {
      if (!product) return;
      const productDTO = new ProductDTO();
      const fields = Object.getOwnPropertyNames(product);
      fields.forEach((field) => (productDTO[field] = product[field]));
      return product;
    }
  }