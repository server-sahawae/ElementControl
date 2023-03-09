const Controller = require("../controllers/category");
const { getAdminTokenDetail } = require("../middlewares/GlobalAccessAuth");

const routes = require("express").Router();

routes.post("/", getAdminTokenDetail, Controller.createCategory);
routes.get("/", getAdminTokenDetail, Controller.getCategory);
routes.get(
  "/detail?:CategoryId",
  getAdminTokenDetail,
  Controller.getCategoryDetail
);
routes.patch("/", getAdminTokenDetail, Controller.patchCategory);
routes.delete("/", getAdminTokenDetail, Controller.deleteCategory);

module.exports = routes;
