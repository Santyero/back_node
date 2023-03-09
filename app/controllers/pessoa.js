// Responsavel por transitar as requisições do usuario/cliente para o controller

const { Op } = require("sequelize");

const db = require("../models");
const Pessoa = db.pessoa;

// Create uma nova pessoa	
create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Pessoa precisa de um nome!"
    });
    return;
  }

  // cria a pessoa
  const pessoa = {
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    cpf: req.body.cpf,
    data_nascimento: req.body.data_nascimento,
    sexo: req.body.sexo,
  };

  // Salva a pessoa
  Pessoa.create(pessoa)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Problema para salvar a pessoa."
      });
    });
};

// Busca todas as pessoas
findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Pessoa.findAll({ where: condition })
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

// Encontra pessoa
findOne = (req, res) => {
  const id = req.params.id;

  Pessoa.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update pessoa
update = (req, res) => {
  const id = req.params.id;

  Pessoa.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Não foi possivel salvar a pessoa com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro para atualizar o id=" + id
      });
    });
};

// Deletar pessoa
_delete = (req, res) => {
  const id = req.params.id;

  Pessoa.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pessoa deletada com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possivel deletar pessoa com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel deletar pessoa com id=" + id
      });
    });
};

// Delete all Tutorials from the database.
deleteAll = (req, res) => {
  Pessoa.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Pessoas foram deletados com sucesso` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Não foi possivel deletar pessoas."
      });
    });
};


exports = module.exports = {
  create,
  findAll,
  findOne,
  update,
  delete: _delete,
  deleteAll
};