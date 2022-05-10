import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendor {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string
}
