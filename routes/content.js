const Controller = require("../controllers/content");
const { getAdminTokenDetail } = require("../middlewares/GlobalAccessAuth");

const routes = require("express").Router();

routes.get("/:ContentId", Controller.getContentByContentId);
routes.patch(
  "/",
  getAdminTokenDetail,
  Controller.patchContentIsActiveByContentId
);
module.exports = routes;
