import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendor {

    id: @PrimaryGeneratedColumn('uuid')
}
