import { Product } from "src/product/entity/product.entity";

export class UserMapper {
    static fromDTOToEntity(productDTO: ProductDTO): Product {
      if (!productDTO) return;
      const user = new Product();
      const fields = Object.getOwnPropertyNames(userDTO);
      fields.forEach((field) => (user[field] = userDTO[field]));
      return user;
    }
  
    static fromEntityToDTO(user: User): UserDTO {
      if (!user) return;
      const userDTO = new UserDTO();
      const fields = Object.getOwnPropertyNames(user);
      fields.forEach((field) => (userDTO[field] = user[field]));
      return user;
    }
  }