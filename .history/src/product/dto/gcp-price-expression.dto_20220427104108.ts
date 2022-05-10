import { TieredRate } from "./gcp-tiered-rate.dto";

export class GCPPriceExpression {
    displayQuantity: number;
    usageUnitDescription: string;
    tieredRates: TieredRate[];
}