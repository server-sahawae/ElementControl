// LOGGER
const fs = require("fs");

const filePath = "./logs.log";

function loggerTrace(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    if (process.env.NODE_ENV !== "production") console.trace(data);
    data = JSON.stringify(data, null, 2);
    fs.fs.appendFileSync(
      filePath,
      `[${timeStamp}] [TRACE] default - ${data}\n`
    );
  }
}

function loggerDebug(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    if (process.env.NODE_ENV !== "production") console.debug(data);
    data = JSON.stringify(data, null, 2);

    fs.appendFileSync(filePath, `[${timeStamp}] [DEBUG] default - ${data}\n`);
  }
}

function loggerInfo(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    if (process.env.NODE_ENV !== "production") console.info(data);
    data = JSON.stringify(data, null, 2);

    fs.appendFileSync(filePath, `[${timeStamp}] [INFO] default - ${data}\n`);
  }
}

function loggerWarn(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    if (process.env.NODE_ENV !== "production") console.warn(data);
    data = JSON.stringify(data, null, 2);

    fs.appendFileSync(filePath, `[${timeStamp}] [WARN] default - ${data}\n`);
  }
}

function loggerError(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    if (process.env.NODE_ENV !== "production") console.error(data);
    data = JSON.stringify(data, null, 2);

    fs.appendFileSync(filePath, `[${timeStamp}] [ERROR] default - ${data}\n`);
  }
}

module.exports = {
  loggerDebug,
  loggerError,
  loggerInfo,
  loggerTrace,
  loggerWarn,
};
// ---- END LOGGER
