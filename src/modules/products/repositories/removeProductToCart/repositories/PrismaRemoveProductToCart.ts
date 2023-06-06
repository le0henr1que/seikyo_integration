import { IRemoveProductToCart } from "../IRemoveProductToCart";
// import logger from "../../../../../config/winston";
import { PrismaClient } from "@prisma/client";

export class PrismaRemoveProductToCart implements IRemoveProductToCart {
  async removeProduct(idProduct: string): Promise<void> {
    const prisma = new PrismaClient();

    await prisma.product.deleteMany({
      where: {
        id: idProduct,
      },
    });
  }
}
