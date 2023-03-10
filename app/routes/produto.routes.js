const express = require('express')
const router = express.Router()

const produto = require("../controllers/produto.js");

// Create
router.post("/", produto.create);

// get all
router.get("/", produto.findAll);


module.exports = router;
