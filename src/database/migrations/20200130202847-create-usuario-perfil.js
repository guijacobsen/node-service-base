var migrationDefaults = require("../defaults");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UsuarioPerfil", {
      ...migrationDefaults(Sequelize),
      perfil: {
        type: Sequelize.STRING(150),
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("UsuarioPerfil");
  }
};
