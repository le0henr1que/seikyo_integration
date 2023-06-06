// import { Cars, CarsSchema } from "../../../entities/CarSchema";
import { IRemoveProductToCart } from "../IRemoveProductToCart";
// import logger from "../../../../../config/winston";
// import { PrismaClient } from "@prisma/client";

export class PrismaRemoveProductToCart implements IRemoveProductToCart {
  async removeProduct(): Promise<void> {
    // const prisma = new PrismaClient();
    // return await CarsSchema.create(car);
    // logger.info("Execute Mongo [REMOVE PRODUCT TO CART]");
  }
}
