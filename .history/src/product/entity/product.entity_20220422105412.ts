import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  productHash: number;

  @Column()
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
