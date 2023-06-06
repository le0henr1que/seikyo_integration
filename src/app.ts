import express from "express";
import cors from "cors";
import corsOptions from "./config/cors";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./utils/swagger/swagger.json";
import { product } from "./modules/products";

const app = express();

app.use(express.json());

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors(corsOptions));
app.use(product);

export { app };
