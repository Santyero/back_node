const express = require("express");
const cors = require("cors");
const app = express();
const login = require('./app/routes/login.routes');
const pessoa = require('./app/routes/pessoa.routes');

const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.con.sync()
.then(() => {
  console.log("==== Database Connected ====");
})
.catch((err) => {
  console.log("\n \n Falha no Banco de dados: " + err.message);
});


app.get("/", (req, res) => {
  res.json({ message: "Aplicação Rodando" });
});


// Rotas
app.use("/login", login)
app.use("/pessoa", pessoa)

app.listen(PORT, () => {
  console.log(`\n \n Servidor rodando na porta::: ${PORT}.`);
});
