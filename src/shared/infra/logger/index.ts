import { env } from "@config/env";
import pino from "pino";
import { name } from "../../../../package.json";

function getLogger() {
  return pino({
    messageKey: "message",
    level: env.LOG_LEVEL,
    name,
  });
}

const Logger = getLogger();

export default Logger;
