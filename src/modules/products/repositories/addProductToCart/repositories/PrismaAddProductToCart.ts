import { IAddProductToCart } from "../IAddProductToCart";
import { Cart, Product } from "../../../../../types/products";
import { PrismaClient } from "@prisma/client";

export class PrismaAddProductToCart implements IAddProductToCart {
  async createCart(): Promise<string> {
    const prisma = new PrismaClient();
    const shoppingCart = await prisma.cart.create({
      data: {},
    });
    return shoppingCart.id;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createProduct(product: Product, cartId: string): Promise<any> {
    const prisma = new PrismaClient();

    const { idPrice, idProduct, idPeriod, name } = product;

    const productCreated = await prisma.product.create({
      data: {
        idPrice,
        idProduct,
        idPeriod,
        name,
        cartId,
      },
    });
    return productCreated.id;
  }

  async verifyId(id: string): Promise<Cart[]> {
    const prisma = new PrismaClient();

    const shoppingCart = await prisma.cart.findMany({
      where: {
        id: id,
      },
    });

    return shoppingCart;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getProductCart(cartId: string): Promise<any> {
    const prisma = new PrismaClient();

    return prisma.product.findFirst({
      where: {
        id: cartId,
      },
    });
  }
}
