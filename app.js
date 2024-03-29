if (process.env.NODE_ENV !== "production") require("dotenv").config();

const path = require("path");
const requestIp = require("request-ip");

const express = require("express");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const ErrorHandler = require("./middlewares/ErrorHandler");
const { loggerInfo } = require("./helpers/loggerDebug");
const redis = require("./config/redisConfig");

app.use(cors({ origin: true, credentials: true }));
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true, limit: 10485760 }));
app.use(express.json());
app.use(requestIp.mw());
app.set("trust proxy", true);

app.get("/log", (req, res) => {
  const ipAddress = req.ip;
  loggerInfo(`CHECK LOG from ${ipAddress}`);
  res.sendFile(path.join(__dirname + "/logs.log"));
});

app.use(routes);
app.use(ErrorHandler);
app.listen(port, async () => {
  if (process.env.DEBUG) {
    loggerInfo(`Element Control listening on port ${port}`);
  } else console.log(`Element Control listening on port ${port}`);
  redis
    .on("error", (err) => loggerInfo("Redis Client Error", err))
    .on("ready", () => loggerInfo("Redis on"));
  await redis.connect();
});
