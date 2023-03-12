const axios = require("axios");

const APIGlobalAccess = axios.create({
  // baseURL: "http://Localhost:3001",
  baseURL: "https://globalaccess.projectmehvish.com/",
  responseType: "json",
  withCredentials: true,
});

module.exports = { APIGlobalAccess };
