export class ProductDto {
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