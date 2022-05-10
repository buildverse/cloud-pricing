import { Product } from "src/product/entity/product.entity";

export class UserMapper {
    static fromDTOToEntity(productDTO: ProductDTO): Product {
      if (!productDTO) return;
      const product = new Product();
      const fields = Object.getOwnPropertyNames(productDTO);
      fields.forEach((field) => (product[field] = productDTO[field]));
      return product;
    }
  
    static fromEntityToDTO(user: User): UserDTO {
      if (!user) return;
      const userDTO = new UserDTO();
      const fields = Object.getOwnPropertyNames(user);
      fields.forEach((field) => (userDTO[field] = user[field]));
      return user;
    }
  }