export class ProductDto {
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