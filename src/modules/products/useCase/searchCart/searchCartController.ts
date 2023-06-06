import { Response, Request } from "express";
import { SearchCartUseCase } from "./searchCartUseCase";

export class SearchCartController {
  constructor(private searchCartUseCase: SearchCartUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    await this.searchCartUseCase.execute();
    return response
      .status(201)
      .json({ error: false, message: "Produto adicionado ao carrinho" });
  }
}
