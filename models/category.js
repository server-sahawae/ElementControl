"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Content);
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      CompanyId: DataTypes.UUID,
      CreatorId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      UpdatedId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      isDynamic: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          isIn: {
            args: [["false", "true"]],
            msg: "Please enter false or true only",
          },
        },
      },
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Category",
    }
  );
  return Category;
};
