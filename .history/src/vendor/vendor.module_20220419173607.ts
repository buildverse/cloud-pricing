import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';

@Module({
  providers: [VendorService]
})
export class VendorModule {}
