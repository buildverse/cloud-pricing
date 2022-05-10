import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorService } from './vendor.service';

@Module({
    imports: [TypeOrmModule.forFeature()],
  providers: [VendorService],
})
export class VendorModule {}
