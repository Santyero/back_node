const { DataTypes } = require('sequelize');

module.exports = (con) => {
	const Pessoa = con.define("pessoa", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			type: DataTypes.STRING
		},
		sobrenome: {
			type: DataTypes.STRING
		},
		cpf: {
			type: DataTypes.STRING
		},
		data_nascimento: {
			type: DataTypes.DATE
		},
		sexo: {
			type: DataTypes.CHAR
		},
	});

	return Pessoa;
};
