import winston, { Logger } from "winston";
import { cyan, yellow, red } from "colorette";
import { logLevel } from "types/common/global";

const coloredFormat = winston.format.printf(
  ({ level, message }: logLevel): string => {
    let coloredLevel = level;

    if (level === "info") {
      coloredLevel = cyan(level);
    } else if (level === "warn") {
      coloredLevel = yellow(level);
    } else if (level === "error") {
      coloredLevel = red(level);
    }
    return `${coloredLevel}: ${message}`;
  }
);

const consoleTransport = new winston.transports.Console();

const logger: Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(coloredFormat),
  transports: [consoleTransport],
});

export default logger;
