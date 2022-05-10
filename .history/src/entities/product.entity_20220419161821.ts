import { Entity } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
}
