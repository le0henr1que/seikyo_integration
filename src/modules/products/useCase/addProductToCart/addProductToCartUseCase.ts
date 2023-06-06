import { CreateShoppingCart } from "types/common/global";
import { IAddProductToCart } from "../../repositories/addProductToCart/IAddProductToCart";
import { Product } from "types/products";
import logger from "../../../../config/winston";

export class AddProductToCartUseCase {
  products: Product[] | undefined;

  constructor(private addProductToCart: IAddProductToCart) {
    this.products = [];
  }

  private async processProducts(
    products: Product[],
    cartId: string
  ): Promise<void> {
    for (const element of products) {
      const { idPeriod, idProduct, idPrice, name } = element;

      const productCreated: Product = {
        idPeriod,
        idProduct,
        idPrice,
        name,
      };

      this.products?.push(productCreated);
      await this.addProductToCart.createProduct(productCreated, cartId);
    }
  }

  async execute(shoppingCart: CreateShoppingCart): Promise<CreateShoppingCart> {
    const { cartId, product } = shoppingCart;

    // eslint-disable-next-line prefer-const
    let arrayProducts = this.products;

    if (!cartId) {
      const cartIdCreated = await this.addProductToCart.createCart();

      if (Array.isArray(product)) {
        await this.processProducts(product, cartIdCreated);
      }

      const dataShoppingCartCreated: CreateShoppingCart = {
        cartId: cartIdCreated,
        product: {
          arrayProducts,
        },
      };
      logger.info(dataShoppingCartCreated);
      return dataShoppingCartCreated;
    }

    const shoppingCartIdExist = await this.addProductToCart.verifyId(cartId);

    if (shoppingCartIdExist.length == 0) {
      logger.error(
        "Carrinho não existe, verifique o id do carrinho e tente novamente."
      );
    }

    if (shoppingCartIdExist.length !== 0) {
      const cartIdForCreate: string | undefined = shoppingCartIdExist[0].id;

      if (Array.isArray(product) && typeof cartIdForCreate === "string") {
        await this.processProducts(product, cartIdForCreate);
      }
    }

    const dataShoppingCartCreated: CreateShoppingCart = {
      cartId: shoppingCartIdExist[0].id,
      product: {
        arrayProducts,
      },
    };
    logger.info(dataShoppingCartCreated);

    return dataShoppingCartCreated;
  }
}
