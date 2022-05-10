import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';

@Module({
    imports: [TypeORM]
  providers: [VendorService],
})
export class VendorModule {}
