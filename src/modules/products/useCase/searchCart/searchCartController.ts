import { Response, Request } from "express";
import { SearchCartUseCase } from "./searchCartUseCase";

export class SearchCartController {
  constructor(private searchCartUseCase: SearchCartUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const cart = await this.searchCartUseCase.execute(id);
    return response.status(201).json({ error: false, cart });
  }
}
