import { CreateShoppingCart } from "types/common/global";
import { IAddProductToCart } from "../../repositories/addProductToCart/IAddProductToCart";
import { Product } from "types/products";
import logger from "../../../../config/winston";
import { HttpError } from "../../../../shared/error";

export class AddProductToCartUseCase {
  constructor(private addProductToCart: IAddProductToCart) {}

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

      await this.addProductToCart.createProduct(productCreated, cartId);
    }
  }

  async execute(shoppingCart: CreateShoppingCart): Promise<CreateShoppingCart> {
    const { cartId, product } = shoppingCart;

    if (product?.length === 0) {
      throw new HttpError("Add a product before registering.", 404);
    }

    if (!cartId) {
      const cartIdCreated = await this.addProductToCart.createCart();

      if (Array.isArray(product)) {
        await this.processProducts(product, cartIdCreated);
      }
      const arrayProductsCart = await this.addProductToCart.getProductCart(
        cartIdCreated
      );

      const dataShoppingCartCreated: CreateShoppingCart = {
        cartId: cartIdCreated,
        product: arrayProductsCart,
      };
      logger.info(dataShoppingCartCreated);
      return dataShoppingCartCreated;
    }

    const shoppingCartIdExist = await this.addProductToCart.verifyId(cartId);

    if (shoppingCartIdExist.length == 0) {
      logger.error("Cart does not exist, check the cart id and try again.");
      throw new HttpError(
        "Shopping Cart does not exist, check the shopping cart id and try again.",
        404
      );
    }

    if (shoppingCartIdExist.length !== 0) {
      const cartIdForCreate: string | undefined = shoppingCartIdExist[0].id;

      if (Array.isArray(product) && typeof cartIdForCreate === "string") {
        await this.processProducts(product, cartIdForCreate);
      }
    }

    const arrayProductsCart = await this.addProductToCart.getProductCart(
      cartId
    );
    const dataShoppingCartCreated: CreateShoppingCart = {
      cartId: shoppingCartIdExist[0].id,
      product: arrayProductsCart,
    };
    logger.info(JSON.stringify(dataShoppingCartCreated));
    return dataShoppingCartCreated;
  }
}
