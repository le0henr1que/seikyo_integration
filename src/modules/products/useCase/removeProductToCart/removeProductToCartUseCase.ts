import { IRemoveProductToCart } from "../../repositories/removeProductToCart/IRemoveProductToCart";

export class RemoveProductToCartUseCase {
  constructor(private removeProductToCart: IRemoveProductToCart) {}

  async execute() {
    // await this.removeProductToCart.execute();
  }
}
