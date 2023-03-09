// LOGGER

const log4js = require("log4js");
const path = require("path");
log4js.configure({
  appenders: { everything: { type: "file", filename: "logs.log" } },
  categories: { default: { appenders: ["everything"], level: "ALL" } },
});
const logger = log4js.getLogger();

function loggerTrace(data) {
  if (process.env.DEBUG) {
    if (process.env.NODE_ENV !== "production") console.trace(data);
    data = JSON.stringify(data, null, 2);

    logger.trace(data);
  }
}

function loggerDebug(data) {
  if (process.env.DEBUG) {
    if (process.env.NODE_ENV !== "production") console.debug(data);
    data = JSON.stringify(data, null, 2);

    logger.debug(data);
  }
}

function loggerInfo(data) {
  if (process.env.DEBUG) {
    if (process.env.NODE_ENV !== "production") console.info(data);
    data = JSON.stringify(data, null, 2);

    logger.info(data);
  }
}

function loggerWarn(data) {
  if (process.env.DEBUG) {
    if (process.env.NODE_ENV !== "production") console.warn(data);
    data = JSON.stringify(data, null, 2);

    logger.warn(data);
  }
}

function loggerError(data) {
  if (process.env.DEBUG) {
    if (process.env.NODE_ENV !== "production") console.error(data);
    data = JSON.stringify(data, null, 2);

    logger.error(data);
  }
}

function loggerFatal(data) {
  if (process.env.DEBUG) {
    if (process.env.NODE_ENV !== "production") console.error(data);
    data = JSON.stringify(data, null, 2);

    logger.fatal(data);
  }
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
