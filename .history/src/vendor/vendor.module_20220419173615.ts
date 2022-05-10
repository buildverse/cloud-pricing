import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';

@Module({
    imports
  providers: [VendorService],
})
export class VendorModule {}
