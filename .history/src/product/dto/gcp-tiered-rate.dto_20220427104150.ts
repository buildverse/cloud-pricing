import { GCPUnitPrice } from "./gcp-unit-price.dto";

type NewType = GCPUnitPrice;

export class TieredRate {
  startUsageAmount: number;
  unitPrice: NewType;
}


