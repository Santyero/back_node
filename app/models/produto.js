const { DataTypes } = require('sequelize');

module.exports = (con) => {
	const Produto = con.define("produto", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			type: DataTypes.STRING
		},
		preco: {
			type: DataTypes.DOUBLE
		},
		taxa: {
			type: DataTypes.DOUBLE
		}
	});

	return Produto;
};
