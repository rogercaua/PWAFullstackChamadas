// presencaRoutes.js
const express = require("express");
const router = express.Router();
const presencaController = require("../controllers/presencaController");

// Rota para registrar presença
router.post("/", presencaController.registrarPresenca);

// Rota para listar presenças
router.get("/", presencaController.listarPresencas);

module.exports = router;
