const express = require("express");
const router = express.Router();
const Hour = require("../model/Hour");
const db = require("../config/database");

router.get("/new", (req, res) => {
  const query = "SELECT * FROM hours";

  db.all(query, (err, hours) => {
    if (err) {
      console.error("Erro ao buscar horas:", err.message);
      res.status(500).send("Erro ao buscar horas");
      return;
    }
    res.render("hours/newHour", { title: "Nova Hora", hours: hours });
  });
});

router.get("/", (req, res) => {
  Hour.findAll((err, hours) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao listar horas" });
    }
    res.render("hours/list", { title: "Lista de Horas", hours });
  });
});

router.get("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  Hour.findByUserId(userId, (err, hours) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar horas" });
    }
    res.render("hours/list", { title: "Horas do Usuário", hours });
  });
});

router.post("/", (req, res) => {
  const { userId, date, startTime, endTime } = req.body;

  Hour.create(userId, date, startTime, endTime, (err, newHour) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao registrar hora" });
    }

    res.redirect(req.headers.referer || "/");
  });
});

module.exports = router;
