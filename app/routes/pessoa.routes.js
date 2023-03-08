const express = require('express')
const router = express.Router()

const pessoa = require("../controllers/pessoa.js");

// Create
router.post("/", pessoa.create);

// get all
router.get("/", pessoa.findAll);

// get one
router.get("/:id", pessoa.findOne);

// Update
router.put("/:id", pessoa.update);

// Delete
router.delete("/:id", pessoa.delete);

module.exports = router;
