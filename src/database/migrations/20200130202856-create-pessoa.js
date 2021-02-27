var migrationDefaults = require("../defaults");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Pessoa", {
      ...migrationDefaults(Sequelize),
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      usuario_perfil_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "UsuarioPerfil",
          key: "id",
        },
      },

      password: {
        type: Sequelize.STRING(150),
      },
      status: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Pessoa");
  },
};
