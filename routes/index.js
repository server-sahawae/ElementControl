const routes = require("express").Router();
const categoryRoutes = require("./category");
const contentRoutes = require("./content");

routes.use("/category", categoryRoutes);
routes.use("/content", contentRoutes);

module.exports = routes;
