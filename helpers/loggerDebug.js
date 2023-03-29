// LOGGER
const fs = require("fs");

const filePath = "./logs.log";

function loggerTrace(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    data = JSON.stringify(data, null, 2);
    fs.fs.appendFileSync(
      filePath,
      `[${timeStamp}] [TRACE] default - ${data}\n`
    );
    if (process.env.NODE_ENV !== "production") console.trace(data);
  }
}

function loggerDebug(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    data = JSON.stringify(data, null, 2);

    fs.appendFileSync(filePath, `[${timeStamp}] [DEBUG] default - ${data}\n`);
  }
  if (process.env.NODE_ENV !== "production") console.debug(data);
}

function loggerInfo(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    data = JSON.stringify(data, null, 2);

    fs.appendFileSync(filePath, `[${timeStamp}] [INFO] default - ${data}\n`);
  }
  if (process.env.NODE_ENV !== "production") console.info(data);
}

function loggerWarn(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    data = JSON.stringify(data, null, 2);

    fs.appendFileSync(filePath, `[${timeStamp}] [WARN] default - ${data}\n`);
  }
  if (process.env.NODE_ENV !== "production") console.warn(data);
}

function loggerError(data) {
  if (process.env.DEBUG) {
    const timeStamp = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
    });
    data = JSON.stringify(data, null, 2);

    fs.appendFileSync(filePath, `[${timeStamp}] [ERROR] default - ${data}\n`);
  }
  if (process.env.NODE_ENV !== "production") console.error(data);
}

module.exports = {
  loggerDebug,
  loggerError,
  loggerInfo,
  loggerTrace,
  loggerWarn,
};
// ---- END LOGGER
