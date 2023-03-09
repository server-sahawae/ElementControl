const redis = require("../config/redisConfig");
const { APPLICATION_ID } = require("../constants/server");

const redisCategory = (CompanyId, CategoryId) => {
  return `${APPLICATION_ID}:${CompanyId}:category:${CategoryId}`;
};

const redisContent = (CompanyId, ContentId) => {
  return `${APPLICATION_ID}:${CompanyId}:content:${ContentId}`;
};

const redisDel = async (CompanyId, CategoryId, ContentId) => {
  try {
    await redis.del(`${APPLICATION_ID}:${CompanyId}:category:all`);
    await redis.del(`${APPLICATION_ID}:${CompanyId}:category:${CategoryId}`);
    await redis.del(`${APPLICATION_ID}:${CompanyId}:content:${ContentId}`);
  } catch (error) {
    return error;
  }
};

module.exports = { redisCategory, redisDel, redisContent };
