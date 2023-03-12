const Controller = require("../controllers/content");
const { getAdminTokenDetail } = require("../middlewares/GlobalAccessAuth");

const routes = require("express").Router();

routes.get("/:ContentId", Controller.getContentByContentId);
routes.patch(
  "/:ContentId",
  getAdminTokenDetail,
  Controller.patchContentIsActiveByContentId
);
routes.put(
  "/:ContentId",
  getAdminTokenDetail,
  Controller.putContentIsActiveByContentId
);
module.exports = routes;
