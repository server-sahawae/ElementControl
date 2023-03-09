const { Op } = require("sequelize");
const { NO_UPDATE } = require("../constants/ErrorKeys");
const { Category, Content } = require("../models");
const redis = require("../config/redisConfig");
const { APIGetNameByUserId } = require("../APIs/GlobalAccess");
const { APPLICATION_ID } = require("../constants/server");
const { redisCategory, redisDel } = require("../helpers/redis");
const logger = require("../helpers/loggerDebug");

module.exports = class Controller {
  static async createCategory(req, res, next) {
    try {
      const { name, icon } = req.body;
      const { UserId, CompanyId } = req.access;
      const data = await Category.create({
        name,
        icon,
        CompanyId,
        CreatorId: UserId,
        UpdatedId: UserId,
      });
      await redisDel(CompanyId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCategory(req, res, next) {
    try {
      console.log(req.access);
      const { CompanyId } = req.access;
      const data = await Category.findAll({
        attributes: ["id", "name", "icon", "isDynamic"],
        where: {
          CompanyId,
        },
        order: [["name", "ASC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryDetail(req, res, next) {
    try {
      logger.log("ENTER GET CATEGORY DETAIL");
      logger.log("REDIS PING -", await redis.ping());
      // await redis.flushall();
      // await redisDel(CompanyId, CategoryId);
      const { access_token } = req.headers;
      const { CategoryId = "all" } = req.query;
      const { CompanyId } = req.access;
      const redisKey = redisCategory(CompanyId, CategoryId);
      const itemRedis = await redis.get(redisKey);
      // logger.debug(JSON.stringify(itemRedis, null, 2));
      const item = await JSON.parse(itemRedis);
      let data = [];
      if (item) {
        logger.log("REDIS EXIST");
        data = item;
      } else {
        const options = { CompanyId };
        if (CategoryId !== "all") options.CategoryId = CategoryId;
        data = await Content.findAll({
          where: options,
          order: [["updatedAt", "DESC"]],
          include: [
            { model: Category, attributes: ["icon", "name", "isDynamic"] },
          ],
        });
        data = await Promise.all(
          data.map(async (el) => {
            el.dataValues.AuthorName = await APIGetNameByUserId(
              el.dataValues.AuthorId,
              access_token
            );
            el.dataValues.UpdatedName = await APIGetNameByUserId(
              el.dataValues.UpdatedId,
              access_token
            );
            el.dataValues.categoryIcon = el.dataValues.Category.icon;
            el.dataValues.categoryName = el.dataValues.Category.name;
            el.dataValues.categoryIsDynamic = el.dataValues.Category.isDynamic;
            delete el.dataValues.CategoryId;
            delete el.dataValues.CompanyId;
            delete el.dataValues.AuthorId;
            delete el.dataValues.UpdatedId;
            delete el.dataValues.Category;
            return el;
          })
        );
        if (data.length) {
          logger.log("SET REDIS");
          console.log(`${APPLICATION_ID}:${CompanyId}:${CategoryId}`);
          await redis.set(redisKey, JSON.stringify(data));
        }
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patchCategory(req, res, next) {
    try {
      console.log("masuk");
      let isUpdate = false;
      const { CategoryId: id, name, icon, isDynamic } = req.body;
      const { UserId, CompanyId } = req.access;

      const initiate = await Category.findOne({ where: { id } });
      await Category.update(
        { id, name, icon, isDynamic, UpdatedId: UserId },
        {
          where: { [Op.and]: [{ CompanyId }, { id }] },
        }
      );
      const result = { message: `Category ${initiate.name} has been updated!` };

      if (name !== initiate.name.toString() && name) {
        result.name = { old: initiate.name, new: name };
        isUpdate = true;
      }
      if (icon !== initiate.icon.toString() && icon) {
        result.icon = { old: initiate.icon, new: icon };
        isUpdate = true;
      }
      if (isDynamic !== initiate.isDynamic.toString() && isDynamic) {
        result.isDynamic = { old: initiate.isDynamic, new: isDynamic };
        isUpdate = true;
      }
      if (!isUpdate) throw { name: NO_UPDATE };
      console.log(isDynamic !== initiate.isDynamic.toString());
      await redisDel(CompanyId, id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      console.log("masuk");
      const { CategoryId: id } = req.body;
      const { UserId, CompanyId } = req.access;
      const data = await Category.update(
        { deletedAt: new Date(), UpdatedId: UserId },
        {
          where: { [Op.and]: [{ CompanyId }, { id }] },
        }
      );
      await redisDel(CompanyId, id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
};
