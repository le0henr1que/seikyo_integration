import logger from "./config/winston";
import { app } from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Running at http://localhost:${PORT}`);
});

