const Controller = require("../controllers/Content");
const { isCategoryGrow } = require("../middlewares/CheckCategory");
const { getAdminTokenDetail } = require("../middlewares/GlobalAccessAuth");

const routes = require("express").Router();

routes.get(
  "/:ContentId",
  getAdminTokenDetail,
  Controller.getContentByContentId
);
routes.patch(
  "/",
  getAdminTokenDetail,
  Controller.patchContentIsActiveByContentId
);
module.exports = routes;