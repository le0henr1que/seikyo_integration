import { Response, Request } from "express";
import { RemoveProductToCartUseCase } from "./removeProductToCartUseCase";

export class RemoveProductToCartController {
  constructor(private removeProductUseCase: RemoveProductToCartUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    await this.removeProductUseCase.execute();
    return response
      .status(201)
      .json({ error: false, message: "Produto adicionado ao carrinho" });
  }
}
