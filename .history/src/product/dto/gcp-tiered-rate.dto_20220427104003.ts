export class TieredRate {
    startUsageAmount: number;
  unitPrice: GCPUnitPrice
}

export class GCPUnitPrice {
    currencyCode: string;
    units: number;
    nanos: number;
}