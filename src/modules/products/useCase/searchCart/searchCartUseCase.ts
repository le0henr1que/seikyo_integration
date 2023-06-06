import { Product } from "types/products";
import { ISearchCart } from "../../repositories/searchCart/ISearchCart";
import axios from "axios";
import { ShoppingCart, InfoProduto } from "types/common/global";

export class SearchCartUseCase {
  sumValor: number;

  constructor(private searchCart: ISearchCart) {
    this.sumValor = 0.0;
  }

  private async handleCallApi() {
    const config = {
      method: "get",
      url: "https://ebs-is-api-hml.rj.r.appspot.com/api/v1/produtos/periodicos",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const dataResponse = await axios.request(config);
    return dataResponse.data;
  }
  private async handleSumShoppingCart(
    infoPrice: InfoProduto[],
    shoppingCart: Product[]
  ) {
    for (const element of shoppingCart) {
      const { idPrice, idProduct, idPeriod } = element;
      for (const elementPrice of infoPrice) {
        const { idProduto } = elementPrice;
        if (idProduto === idProduct) {
          for (const elementPeriod of elementPrice.periodicidades) {
            if (
              elementPeriod.idPeriodo === idPeriod &&
              elementPeriod.idPreco == idPrice
            ) {
              // console.log(elementPeriod.valorPeriodo)
              this.sumValor += parseFloat(elementPeriod.valorPeriodo);
            }
          }
        }
      }
    }
  }

  async execute(idCart: string): Promise<ShoppingCart> {
    this.sumValor = 0.0;
    const infoPricedataSeikyo = await this.handleCallApi();
    const cart = await this.searchCart.searchCart(idCart);
    await this.handleSumShoppingCart(infoPricedataSeikyo, cart.product);

    const shoppingCart = {
      totalPrice: this.sumValor,
      cart,
    };

    return shoppingCart;
  }
}
