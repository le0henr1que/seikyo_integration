import * as Prisma from "../../repositories/removeProductToCart/repositories/PrismaRemoveProductToCart";
import { RemoveProductToCartController } from "./removeProductToCartController";
import { RemoveProductToCartUseCase } from "./removeProductToCartUseCase";

const prismaProductRepository = new Prisma.PrismaRemoveProductToCart();

const removeProductToCartUseCase = new RemoveProductToCartUseCase(
  prismaProductRepository
);

const removeProductToCartController = new RemoveProductToCartController(
  removeProductToCartUseCase
);

export { removeProductToCartUseCase, removeProductToCartController };
