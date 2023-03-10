// Responsavel por cuidar das regras de negocio, acesso a dados e entidades
const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config.js");

const connection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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


db.con = connection;

db.produto = require("./produto.js")(connection);

module.exports = db;
