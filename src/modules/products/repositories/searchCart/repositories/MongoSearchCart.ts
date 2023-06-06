// import { Cars, CarsSchema } from "../../../entities/CarSchema";
import { ISearchCart } from "../ISearchCart";
import logger from "../../../../../config/winston";

export class MongoSearchCart implements ISearchCart {
  async execute(): Promise<void> {
    // return await CarsSchema.create(car);
    logger.info("Execute Mongo [SEARCH PRODUCT]");
  }
}
