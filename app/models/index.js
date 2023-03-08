// Responsavel por cuidar das regras de negocio, acesso a dados e entidades

const dbConfig = require("../config/db.config.js");

const con = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};


db.con = sequelize;

db.pessoa = require("./pessoa.js")(con);
db.login = require("./login.js")(con);

module.exports = db;
