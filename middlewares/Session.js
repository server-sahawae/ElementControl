const { LOGIN_ATTEMPS_FAILED } = require("../constants/ErrorKeys");

async function LoginUser(req, res, next) {
  try {
    const MailAttemps = req.session["MailAttemps"];
    if (MailAttemps < 3 || !MailAttemps) {
      //   console.log("masuk");
      req.session["MailAttemps"] = !req.session["MailAttemps"]
        ? 1
        : req.session["MailAttemps"] + 1;
      if (!MailAttemps) req.session.cookie.expires = 20000;
    } else if (!req.session["isLoginFailed"]) {
      req.session["isLoginFailed"] = true;
      req.session.cookie.expires = 10000;
      throw { name: LOGIN_ATTEMPS_FAILED, exp: req.session.cookie.expires };
    } else if (req.session["isLoginFailed"]) {
      throw { name: LOGIN_ATTEMPS_FAILED, exp: req.session.cookie.expires };
    }
    // console.log(req.session["MailAttemps"]);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { LoginUser };
