import { CreateShoppingCart } from "types/common/global";
import { IAddProductToCart } from "../../repositories/addProductToCart/IAddProductToCart";
import { Product } from "types/products";
import logger from "../../../../config/winston";
import { HttpError } from "../../../../shared/error";

export class AddProductToCartUseCase {
  constructor(private addProductToCart: IAddProductToCart) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async processProducts(
    products: Product[],
    cartId: string
  ): Promise<any> {
    for (const element of products) {
      const { idPeriod, idProduct, idPrice, name } = element;

      const productCreated: Product = {
        idPeriod,
        idProduct,
        idPrice,
        name,
      };

      return await this.addProductToCart.createProduct(productCreated, cartId);
    }
  }

  async execute(shoppingCart: CreateShoppingCart): Promise<CreateShoppingCart> {
    const { cartId, product } = shoppingCart;

    if (product?.length === 0) {
      throw new HttpError("Add a product before registering.", 404);
    }

    if (!cartId) {
      const cartIdCreated = await this.addProductToCart.createCart();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const idProductCreaated = await this.processProducts(
        product,
        cartIdCreated
      );

      const arrayProductsCart = await this.addProductToCart.getProductCart(
        idProductCreaated
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

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      // eslint-disable-next-line no-var
      var productCreated = await this.processProducts(product, cartIdForCreate);
    }

    const arrayProductsCart = await this.addProductToCart.getProductCart(
      productCreated
    );
    const dataShoppingCartCreated: CreateShoppingCart = {
      cartId: shoppingCartIdExist[0].id,
      product: arrayProductsCart,
    };
    logger.info(JSON.stringify(dataShoppingCartCreated));
    return dataShoppingCartCreated;
  }
}
