const redis = require("../config/redisConfig");
const { APPLICATION_ID } = require("../constants/server");

class Redis {
  static categoryKey(CompanyId, CategoryId) {
    return `${APPLICATION_ID}:${CompanyId}:category:${CategoryId}`;
  }

  static contentKey(ContentId) {
    return `${APPLICATION_ID}:content:${ContentId}`;
  }

  static async del(CompanyId, CategoryId, ContentId) {
    try {
      console.log("enter redis del");

      await redis.del(`${APPLICATION_ID}:${CompanyId}:category:all`);
      await redis.del(`${APPLICATION_ID}:${CompanyId}:category:${CategoryId}`);
      await redis.del(`${APPLICATION_ID}:content:${ContentId}`);
      // await redis.disconnect();
    } catch (error) {
      return error;
    }
  }
}

module.exports = Redis;
