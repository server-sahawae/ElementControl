const { APITokenValidation } = require("../APIs/GlobalAccess");
const { UNAUTHORIZED } = require("../constants/ErrorKeys");

async function getAdminTokenDetail(req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log("masuk check token");
    const { data } = await APITokenValidation(access_token);
    console.log(data.RoleLevel);
    if (data.RoleLevel !== 1) throw { name: UNAUTHORIZED };
    req.access = { ...req.access, ...data };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { getAdminTokenDetail };
