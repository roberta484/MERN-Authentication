import app from "./app";
import { ParsedEnv } from "./config/env-config";
import MongoConnection from "./database/mongo-connection";

import { logger } from "./utils";

const PORT = ParsedEnv.PORT;

async function startServer() {
  try {
    MongoConnection();
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();

process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error: Error) => {
  logger.error("Unhandled Rejection at:", error);
  process.exit(1);
});
