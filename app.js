if (process.env.NODE_ENV !== "production") require("dotenv").config();

const path = require("path");

const express = require("express");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true, limit: 10485760 }));
app.use(express.json());
const ErrorHandler = require("./middlewares/ErrorHandler");
const logger = require("./helpers/loggerDebug");

app.get("/log", (req, res) => {
  console.log("masuk");
  logger.debug("Masuk Log");
  res.sendFile(path.join(__dirname + "/logs.log"));
});

app.use(routes);
app.use(ErrorHandler);
app.listen(port, () => {
  console.log(`Element Control listening on port ${port}`);
});
