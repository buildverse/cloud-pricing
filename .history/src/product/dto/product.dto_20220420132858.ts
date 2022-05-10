export class ProductDto {
    productHash: string;
 
      sku: string;
    
   
      service: string;
  
      productFamily: string;
    
 
      attributes: string;
    
   
      prices: string;
    
      @ManyToOne(() => Vendor, (vendor) => vendor.products)
      vendor: Vendor;
}