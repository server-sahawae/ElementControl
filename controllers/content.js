const { Op } = require("sequelize");
const { APIGetNameByUserId } = require("../APIs/GlobalAccess");
const redis = require("../config/redisConfig");
const { NO_DATA, NO_UPDATE } = require("../constants/ErrorKeys");
const { loggerInfo, loggerDebug } = require("../helpers/loggerDebug");
const { redisDel, redisContent } = require("../helpers/redis");
const { Content } = require("../models");

module.exports = class Controller {
  static async getContentByContentId(req, res, next) {
    try {
      const { ContentId } = req.params;
      const { CompanyId } = req.access;
      const redisKey = redisContent(CompanyId, ContentId);
      const { access_token } = req.headers;
      const itemRedis = JSON.parse(await redis.get(redisKey));
      let result = {};
      if (!itemRedis) {
        const data = await Content.findOne({
          where: { [Op.and]: [{ CompanyId }, { id: ContentId }] },
        });
        data.dataValues.AuthorName = await APIGetNameByUserId(
          data.dataValues.AuthorId,
          access_token
        );
        data.dataValues.UpdatedName = await APIGetNameByUserId(
          data.dataValues.UpdatedId,
          access_token
        );
        delete data.dataValues.AuthorId;
        delete data.dataValues.UpdatedId;
        delete data.dataValues.CompanyId;
        await redis.set(redisKey, JSON.stringify(data));
        loggerInfo("SET CONTENT REDIS");
        result = data;
      } else result = itemRedis;
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async patchContentIsActiveByContentId(req, res, next) {
    try {
      const { isActive, ContentId } = req.body;
      const { CompanyId, UserId } = req.access;
      const data = await Content.findOne({
        where: { [Op.and]: [{ CompanyId }, { id: ContentId }] },
      });
      if (!data) throw { name: NO_DATA };
      if (data.isActive == isActive) throw { name: NO_UPDATE };
      await Content.update(
        { isActive, UpdatedId: UserId },
        { where: { id: ContentId } }
      );
      loggerDebug(`REDIS KEY: ${CompanyId}:${data.CategoryId}:${ContentId}`);
      await redisDel(CompanyId, data.CategoryId, ContentId);
      res.status(200).json({
        message: `${data.title} is now ${
          isActive != "false" ? "active" : "inactive"
        }`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async putContentById(req, res, next) {
    try {
    } catch (error) {}
  }
};
