import mongoose, { MongooseError } from "mongoose";
import { logger } from "../utils";
import { ErrorMessages, SuccessMessages } from "../constants";
import { ParsedEnv } from "../config/env-config";

function MongoConnection() {
  const mongo_url = ParsedEnv.MONGO_DB_URI;

  if (!mongo_url) {
    logger.warn(ErrorMessages.MONGO_ENV_NOT_DEFINED);
    process.exit(1);
  }
  try {
    mongoose.connect(mongo_url);
    logger.info(SuccessMessages.MONGO_CONNECTION_SUCCESS);
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      logger.error(`Mongoose Error: ${error.message}`);
    } else if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
    } else {
      logger.error(ErrorMessages.MONGO_CONNECTION_ERROR, error);
    }
    process.exit(1);
  }
}

export default MongoConnection;
