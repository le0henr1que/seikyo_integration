import { ISearchCart } from "../../repositories/searchCart/ISearchCart";

export class SearchCartUseCase {
  constructor(private searchCart: ISearchCart) {}

  async execute() {
    await this.searchCart.execute();
  }
}
