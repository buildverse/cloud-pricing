import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vendor } from '../../entities/vendor.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productHash: string;

  sku: string;

  service: string;

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
