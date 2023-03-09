// LOGGER

const log4js = require("log4js");
const path = require("path");

function loggerTrace(data) {
  if (process.env.NODE_ENV !== "production") console.trace(data);
  data = JSON.stringify(data, null, 2);
  log4js.configure({
    appenders: { everything: { type: "file", filename: "logs.log" } },
    categories: { default: { appenders: ["everything"], level: "ALL" } },
  });

  const logger = log4js.getLogger();
  logger.trace(data);
}

function loggerDebug(data) {
  if (process.env.NODE_ENV !== "production") console.debug(data);
  data = JSON.stringify(data, null, 2);
  log4js.configure({
    appenders: { everything: { type: "file", filename: "logs.log" } },
    categories: { default: { appenders: ["everything"], level: "ALL" } },
  });

  const logger = log4js.getLogger();
  logger.debug(data);
}

function loggerInfo(data) {
  if (process.env.NODE_ENV !== "production") console.info(data);
  data = JSON.stringify(data, null, 2);
  log4js.configure({
    appenders: { everything: { type: "file", filename: "logs.log" } },
    categories: { default: { appenders: ["everything"], level: "ALL" } },
  });

  const logger = log4js.getLogger();
  logger.info(data);
}

function loggerWarn(data) {
  if (process.env.NODE_ENV !== "production") console.warn(data);
  data = JSON.stringify(data, null, 2);
  log4js.configure({
    appenders: { everything: { type: "file", filename: "logs.log" } },
    categories: { default: { appenders: ["everything"], level: "ALL" } },
  });

  const logger = log4js.getLogger();
  logger.warn(data);
}

function loggerError(data) {
  if (process.env.NODE_ENV !== "production") console.error(data);
  data = JSON.stringify(data, null, 2);
  log4js.configure({
    appenders: { everything: { type: "file", filename: "logs.log" } },
    categories: { default: { appenders: ["everything"], level: "ALL" } },
  });

  const logger = log4js.getLogger();
  logger.error(data);
}

function loggerFatal(data) {
  if (process.env.NODE_ENV !== "production") console.error(data);
  data = JSON.stringify(data, null, 2);
  log4js.configure({
    appenders: { everything: { type: "file", filename: "logs.log" } },
    categories: { default: { appenders: ["everything"], level: "ALL" } },
  });

  const logger = log4js.getLogger();
  logger.fatal(data);
}

module.exports = {
  loggerDebug,
  loggerError,
  loggerFatal,
  loggerInfo,
  loggerTrace,
  loggerWarn,
};
// ---- END LOGGER
