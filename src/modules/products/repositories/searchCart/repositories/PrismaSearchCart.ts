import { ISearchCart } from "../ISearchCart";
import { PrismaClient } from "@prisma/client";

export class PrismaSearchCart implements ISearchCart {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async searchCart(idCart: string): Promise<any> {
    const prisma = new PrismaClient();

    return await prisma.cart.findFirst({
      select: {
        id: true,
        product: true,
      },
      where: {
        id: idCart,
      },
    });
  }
}
