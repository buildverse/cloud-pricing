export class TieredRate {
    startUsageAmount: number;
  unitPrice: GCPUnitPrice
}

export class GPUnitPrice {
    currencyCode: string;
    units: number;
    nanos: number;
}