export interface IRemoveProductToCart {
  removeProduct(idProduct: string): Promise<void>;
}
