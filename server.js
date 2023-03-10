const express = require("express");
const cors = require("cors");
const app = express();
const produto = require('./app/routes/produto.routes');

const PORT = process.env.PORT || 8250;

var corsOptions = {
  origin: "http://localhost:8250"
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
app.use("/produto", produto)

app.listen(PORT, () => {
  console.log(`\n \n Servidor rodando na porta::: ${PORT}.`);
});
