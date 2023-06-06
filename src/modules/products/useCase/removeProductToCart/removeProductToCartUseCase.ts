import { IRemoveProductToCart } from "../../repositories/removeProductToCart/IRemoveProductToCart";

export class RemoveProductToCartUseCase {
  constructor(private removeProductToCart: IRemoveProductToCart) {}

  async execute(idProduct: string) {
    await this.removeProductToCart.removeProduct(idProduct);
  }
}
