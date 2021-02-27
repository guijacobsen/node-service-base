"use strict";
module.exports = {
  up: async (queryInterface) => {
    return await queryInterface.bulkInsert("UsuarioPerfil", [
      {
        perfil: "Admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        perfil: "Cliente",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) =>
    queryInterface.bulkDelete("UsuarioPerfil", null, {}),
};
