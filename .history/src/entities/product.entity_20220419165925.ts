import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    productHash: string;

    @Column({
        nullable: false
    })
    sku: string;

    @Column({
        nullable: false
    })
    vendorName: string;

    @Column()
    productHash: string;

    @Column({
        nullable: false
    })
    service: string;

    @Column({
        nullable: false
    })
    productFamily: string;

    @Column({
        nullable: false
    })
    attributes: jsonb;

}
