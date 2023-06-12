import { Response, Request } from "express";
import { RemoveProductToCartUseCase } from "./removeProductToCartUseCase";

export class RemoveProductToCartController {
  constructor(private removeProductUseCase: RemoveProductToCartUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.removeProductUseCase.execute(id);
    return response.status(201).json({
      error: false,
      message: "Product removed from shopping cart successfully",
    });
  }
}
