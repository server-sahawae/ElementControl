"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Contents", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      ImageCover: {
        type: Sequelize.STRING,
      },
      AuthorId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      CompanyId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      CategoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Categories" },
      },
      UpdatedId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Contents");
  },
};
