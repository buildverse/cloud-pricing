import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productHash: string;

  @Column({
    nullable: false,
  })
  sku: string;

  @Column({
    nullable: false,
  })
  service: string;

  @Column({
    nullable: false,
  })
  productFamily: string;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  attributes: string;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  prices: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.products)
  vendor: Vendor;
}
