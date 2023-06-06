import { Router } from "express";
import { addProductToCartController } from "./useCase/addProductToCart";
import { removeProductToCartController } from "./useCase/removeProductToCart";
import { searchCartController } from "./useCase/searchCart";
import { resolver } from "../../shared/error";

const product = Router();

product.post(
  "/api/cart/product",
  resolver((request, response) => {
    return addProductToCartController.handle(request, response);
  })
);

product.delete(
  "/api/cart/product/:id",
  resolver((request, response) => {
    return removeProductToCartController.handle(request, response);
  })
);

product.get(
  "/api/cart/:id",
  resolver((request, response) => {
    return searchCartController.handle(request, response);
  })
);

export { product };
