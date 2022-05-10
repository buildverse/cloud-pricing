import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendor {

    @PrimaryGeneratedColumn('uuid')
    id: string
}
