import * as Prisma from "../../repositories/searchCart/repositories/MongoSearchCart";
import { SearchCartController } from "./searchCartController";
import { SearchCartUseCase } from "./searchCartUseCase";

const prismaProductRepository = new Prisma.MongoSearchCart();

const searchCartUseCase = new SearchCartUseCase(prismaProductRepository);

const searchCartController = new SearchCartController(searchCartUseCase);

export { searchCartUseCase, searchCartController };
