import * as Prisma from "../../repositories/addProductToCart/repositories/PrismaAddProductToCart";
import { AddProductToCartController } from "./addProductToCartController";
import { AddProductToCartUseCase } from "./addProductToCartUseCase";

const prismaProductRepository = new Prisma.PrismaAddProductToCart();

const addProductToCartUseCase = new AddProductToCartUseCase(
  prismaProductRepository
);

const addProductToCartController = new AddProductToCartController(
  addProductToCartUseCase
);

export { addProductToCartUseCase, addProductToCartController };
