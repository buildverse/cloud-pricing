import { Expose } from "class-transformer";

export class GCPService {
  @Expose()
  serviceId: string;
  @Expose()
  displayName: string;
}
