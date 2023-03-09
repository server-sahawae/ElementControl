const { Category } = require("../models");

async function isCategoryGrow(req, res, next) {
  try {
    const { CompanyId } = req.access;
    const { CategoryId: id } = req.body;
    const data = await Category.findOne({
      attributes: ["isDynamic"],
      where: { id, CompanyId },
    });
    if (!data.isDynamic) throw { name: UNAUTHORIZED };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { isCategoryGrow };
