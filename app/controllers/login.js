// Responsavel por transitar as requisições do usuario/cliente para o controller

const { Op } = require("sequelize");

const db = require("../models");
const Login = db.login;
const Pessoa = db.pessoa;

// Create uma nova login	
create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "login precisa de um nome!"
        });
        return;
    }

    const verificaPessoa = Login.findOne({ where: { email: req.body.email } });
    if (verificaPessoa) {
        res.status(400).send({
            message: "Email já cadastrado!"
        });
        return;
    }

    const pessoa = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        cpf: req.body.cpf,
        data_nascimento: req.body.data_nascimento,
        sexo: req.body.sexo,
    };
    const pessoaCriada = Pessoa.create(pessoa)
    .then(data => {

        if (!data) {
            throw new Error("Problema para salvar a pessoa.");
        }

        // cria a login
        const login = {
            email: req.body.email,
            senha: req.body.senha,
            pessoa_id: pessoaCriada.id,
        };

        // Salva a login
        Login.create(login)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Problema para salvar a login."
                });
            });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Problema para salvar a pessoa."
        });
    });
};

// Busca todas as logins
findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

    Login.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro para buscar as logins."
            });
        });
};

// Encontra login
findOne = (req, res) => {
    const id = req.params.id;

    Login.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Erro para buscar o login com id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro para buscar a pessoa com id=" + id
            });
        });
};

// Update login
update = (req, res) => {
    const id = req.params.id;

    Login.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Login atualizado com sucesso ."
                });
            } else {
                res.send({
                    message: `Não foi possivel salvar a login com id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro para atualizar o id=" + id
            });
        });
};

// Deletar login
_delete = (req, res) => {
    const id = req.params.id;

    Login.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "login deletada com sucesso!"
                });
            } else {
                res.send({
                    message: `Não foi possivel deletar login com id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possivel deletar login com id=" + id
            });
        });
};

// Delete all Tutorials from the database.
deleteAll = (req, res) => {
    Login.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} logins foram deletados com sucesso` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Não foi possivel deletar logins."
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