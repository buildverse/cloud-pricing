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

  @Column()
  service: string;

  @Column()
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
