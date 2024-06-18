const express = require("express");
const router = express.Router();
const Hour = require("../model/Hour");
const db = require("../config/database");

// Rota para renderizar o formulário de criação de nova hora
// Rota GET para renderizar a página newHour.ejs com as horas existentes
router.get("/new", (req, res) => {
  // Selecionar todas as horas da tabela 'hours'
  const query = "SELECT * FROM hours";

  db.all(query, (err, hours) => {
    if (err) {
      console.error("Erro ao buscar horas:", err.message);
      res.status(500).send("Erro ao buscar horas");
      return;
    }

    // Renderizar a página newHour.ejs e passar as horas encontradas como dados
    res.render("hours/newHour", { title: "Nova Hora", hours: hours });
  });
});

// Rota para listar todas as horas
router.get("/", (req, res) => {
  Hour.findAll((err, hours) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao listar horas" });
    }
    res.render("hours/list", { title: "Lista de Horas", hours });
  });
});

// Rota para obter horas por usuário ID
router.get("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  Hour.findByUserId(userId, (err, hours) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar horas" });
    }
    res.render("hours/list", { title: "Horas do Usuário", hours });
  });
});

// Rota para criar uma nova hora
router.post("/", (req, res) => {
  const { userId, date, startTime, endTime } = req.body;

  Hour.create(userId, date, startTime, endTime, (err, newHour) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao registrar hora" });
    }
    // Redireciona para a página anterior usando o referer do cabeçalho HTTP
    res.redirect(req.headers.referer || "/"); // Redireciona para a página anterior ou para '/' se não houver referer
  });
});

module.exports = router;
