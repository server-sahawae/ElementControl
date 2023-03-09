if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const ErrorHandler = require("./middlewares/ErrorHandler");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3000;
// const session = require("express-session");
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true, limit: 10485760 }));
app.use(express.json());
// app.use(
//   session({
//     secret: process.env.ENCRYPTION_KEY,
//     resave: true,
//     saveUninitialized: false,
//   })
// );

app.use(routes);
app.use(ErrorHandler);
app.listen(port, () => {
  console.log(`gloabalAccess listening on port ${port}`);
});
