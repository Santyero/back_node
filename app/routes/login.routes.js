const express = require('express')
const router = express.Router()

const login = require("../controllers/login.js");

// Create
router.post("/", login.create);

// get all
router.get("/", login.findAll);

// get one
router.get("/:id", login.findOne);

// Update
router.put("/:id", login.update);

// Delete
router.delete("/:id", login.delete);

module.exports = router;
