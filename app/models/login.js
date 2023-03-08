const { DataTypes } = require("sequelize");

module.exports = (con) => {
    const Login = con.define("login", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING
        },
        senha: {
            type: DataTypes.STRING
        },
        id_pessoa: {
            type: DataTypes.INTEGER
        }
    });

    return Login;
};
