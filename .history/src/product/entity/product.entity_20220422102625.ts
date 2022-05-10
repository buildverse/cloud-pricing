import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vendor } from '../../entities/vendor.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  productHash: string;

  sku: string;

  service: string;

  productFamily: string;

  @Column({
    type: 'jsonb',
  })
  attributes: string;

  @Column({
    type: 'jsonb',
  })
  prices: string;
}
