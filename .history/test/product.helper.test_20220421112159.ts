import { Item } from '../src/product/model/Items';


export class ProductTestHelper {
  getSku(item: Items): string {
    return '';
  }
  /*  getSku() {
        let sku = `${item.skuId}/${item.meterId}`;

        // Use the ARM SKU Name for VMs and App Service Plans so we can group the purchase options
        if (
            item.serviceName === 'Virtual Machines' ||
            item.serviceName === 'Azure App Service'
        ) {
            sku = `${item.productId}/${item.armSkuName}/${item.meterId}`;
        }
        return sku;
    }*/
}
