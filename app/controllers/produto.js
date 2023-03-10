// Responsavel por transitar as requisições do usuario/cliente para o controller

const { Op } = require("sequelize");

const db = require("../models");
const { calculaTaxa } = require("../services/produto");
const Produto = db.produto;

// Create uma nova pessoa	
create = (req, res) => {
  // cria a pessoa
  const {nome, preco} = req.body

  const produto = {
    nome: nome,
    preco: preco,
    taxa: calculaTaxa(preco)
  };

  // Salva a produto
  Produto.create(produto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Problema para salvar a produto."
      });
    });
};

// Busca todas os produtos
findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Produto.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports = module.exports = {
  create,
  findAll,
};