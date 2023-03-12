if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { createClient } = require("redis");

console.log("masuk redis");
const redis = createClient({
  url: process.env.REDIS_URL,
});

module.exports = redis;
