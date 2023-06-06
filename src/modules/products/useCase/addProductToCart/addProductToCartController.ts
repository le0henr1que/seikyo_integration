import { Response, Request } from "express";
import { AddProductToCartUseCase } from "./addProductToCartUseCase";
import { CreateShoppingCart } from "types/common/global";

export class AddProductToCartController {
  constructor(private addProductUseCase: AddProductToCartUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { cartId, product } = request.body;

    const shoppingCart: CreateShoppingCart = {
      cartId,
      product,
    };

    const returnShoppingCart = await this.addProductUseCase.execute(
      shoppingCart
    );

    return response
      .status(201)
      .json({ error: false, data: returnShoppingCart });
  }
}
