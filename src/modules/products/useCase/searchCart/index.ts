import * as Prisma from "../../repositories/searchCart/repositories/PrismaSearchCart";
import { SearchCartController } from "./searchCartController";
import { SearchCartUseCase } from "./searchCartUseCase";

const prismaProductRepository = new Prisma.PrismaSearchCart();

const searchCartUseCase = new SearchCartUseCase(prismaProductRepository);

const searchCartController = new SearchCartController(searchCartUseCase);

export { searchCartUseCase, searchCartController };
