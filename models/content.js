"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Content.belongsTo(models.Category);
    }
  }
  Content.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.TEXT,
      ImageCover: DataTypes.STRING,
      AuthorId: DataTypes.UUID,
      UpdatedId: DataTypes.UUID,
      CompanyId: DataTypes.UUID,
      CategoryId: {
        type: DataTypes.UUID,
        references: { model: "Category" },
      },
      UpdatedId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Content",
    }
  );
  return Content;
};
