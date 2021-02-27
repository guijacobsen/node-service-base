const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  freezeTableName: true,
  dialect: "postgres",
  dialectOptions: {
    decimalNumbers: true,
    ssl: { require: true, rejectUnauthorized: false },
  },
  define: {
    timestamp: true,
    underscored: true,
    freezeTableName: true,
    operatorsAliases: true,
  },
};
