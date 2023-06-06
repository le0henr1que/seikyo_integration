import { Cart, Product } from "../../../../types/products";

export interface IAddProductToCart {
  createCart(): Promise<string>;
  createProduct(product: Product, cartId: string): Promise<void>;
  verifyId(id: string): Promise<Cart[]>;
}
