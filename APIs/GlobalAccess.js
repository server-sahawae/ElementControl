const { BAD_REQUEST } = require("../constants/ErrorKeys");
const { APPLICATION_ID } = require("../constants/server");
const { APIGlobalAccess } = require("./ApiManager");

const APITokenValidation = async (access_token) => {
  try {
    const result = await APIGlobalAccess("/server", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        access_token,
        applicationid: APPLICATION_ID,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const APIGetNameByUserId = async (UserId, access_token) => {
  try {
    const { data: result } = await APIGlobalAccess("/server/" + UserId, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        // access_token,
        applicationid: APPLICATION_ID,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { APITokenValidation, APIGetNameByUserId };
