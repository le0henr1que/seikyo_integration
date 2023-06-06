import { Product } from "../products/index";

export interface CreateShoppingCart {
  cartId?: string;
  product: { [Product] };
}

interface logLevel {
  level: string;
  message: string;
}
