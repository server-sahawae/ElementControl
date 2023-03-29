const { APITokenValidation } = require("../APIs/GlobalAccess");
const { UNAUTHORIZED } = require("../constants/ErrorKeys");
const { loggerInfo } = require("../helpers/loggerDebug");

async function getAdminTokenDetail(req, res, next) {
  try {
    const { access_token } = req.headers;
    loggerInfo("GET ADMIN TOKEN");
    const { data } = await APITokenValidation(access_token);
    if (data.RoleLevel !== 1) throw { name: UNAUTHORIZED };
    req.access = { ...req.access, ...data };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { getAdminTokenDetail };
