const {
  APLICATION_INVALID,
  USER_INVALID,
  JWT_INVALID,
  UNAUTHORIZED,
  JWT_EXPIRED,
  EMAIL_DUPLICATE,
  USERNAME_DUPLICATE,
  INPUT_EMAIL_PHONE_USERNAME,
  PHONE_DUPLICATE,
  IDNUMBER_DUPLICATE,
  BAD_REQUEST,
  VERSION_OUTDATED,
  LOGIN_ATTEMPS_FAILED,
  NO_UPDATE,
  NO_DATA,
} = require("../constants/ErrorKeys");
const logger = require("../helpers/loggerDebug");

module.exports = function ErrorHandler(err, req, res, next) {
  logger.error(JSON.stringify(err, null, 2));
  switch (err.name) {
    case APLICATION_INVALID:
      data = {
        code: 404,
        name: APLICATION_INVALID,
        message: "Application not found.",
      };
      break;
    case USER_INVALID:
      data = {
        code: 400,
        name: USER_INVALID,
        message: "username/password invalid",
      };
      break;
    case JWT_INVALID:
      data = {
        code: 400,
        name: JWT_INVALID,
        message: "Your token is invalid.",
      };
      break;
    case UNAUTHORIZED:
      data = {
        code: 401,
        name: UNAUTHORIZED,
        message: "You have no autorization",
      };
      break;
    case JWT_EXPIRED:
      data = {
        code: 401,
        name: UNAUTHORIZED,
        message: "Your session has been expired",
      };
      break;
    case EMAIL_DUPLICATE:
      data = {
        code: 400,
        name: EMAIL_DUPLICATE,
        message: "This email is already used",
      };
      break;
    case USERNAME_DUPLICATE:
      data = {
        code: 400,
        name: USERNAME_DUPLICATE,
        message: "This username is already used",
      };
      break;
    case PHONE_DUPLICATE:
      data = {
        code: 400,
        name: PHONE_DUPLICATE,
        message: "This phone number is already used",
      };
      break;
    case IDNUMBER_DUPLICATE:
      data = {
        code: 400,
        name: IDNUMBER_DUPLICATE,
        message: "This ID Number number is already used",
      };
      break;
    case INPUT_EMAIL_PHONE_USERNAME:
      data = {
        code: 400,
        name: INPUT_EMAIL_PHONE_USERNAME,
        message:
          "Please input at least email,username, ID Number or phone number",
      };
      break;
    case BAD_REQUEST:
      data = {
        code: 503,
        name: BAD_REQUEST,
        message: "Bad request",
      };
      break;
    case VERSION_OUTDATED:
      data = {
        code: 503,
        name: VERSION_OUTDATED,
        message: "This version is outdated!",
      };
      break;
    case LOGIN_ATTEMPS_FAILED:
      data = {
        code: 503,
        name: LOGIN_ATTEMPS_FAILED,
        message: "Wait 5 minutes for another login attemps",
      };
      break;
    case NO_UPDATE:
      data = {
        code: 503,
        name: NO_UPDATE,
        message: "Nothing to Update",
      };
      break;
    case NO_DATA:
      data = {
        code: 503,
        name: NO_DATA,
        message: "Data is not found!",
      };
      break;
    default:
      data = {
        code: err?.response?.status || 500,
        name: err?.message || "ISE",
        message: Array.isArray(err?.errors)
          ? err.errors?.map((el) => el.message)
          : err?.response?.data?.message || "INTERNAL SERVER ERROR",
      };
      break;
  }
  res.status(data.code).json({ message: data.message });
};
