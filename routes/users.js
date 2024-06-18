const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Hour = require("../model/Hour"); // Se necessário, importe o modelo de Hour

// Rota para renderizar o formulário de criação de novo usuário
router.get("/new", (req, res) => {
  res.render("users/newUser", { title: "Novo Usuário" });
});

// Rota para listar todos os usuários
router.get("/", (req, res) => {
  User.findAll((err, users) => {
    if (err) {
      console.error("Erro ao listar usuários:", err);
      return res.status(500).json({ message: "Erro ao listar usuários" });
    }
    res.render("users/list", { title: "Lista de Usuários", users });
  });
});

// Rota para obter um usuário por ID e mostrar detalhes
router.get("/:id", (req, res) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) {
      console.error(`Erro ao buscar usuário com ID ${userId}:`, err);
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Renderiza a página de detalhes do usuário
    res.render("users/detail", {
      user,
      title: `Detalhes do Usuário - ${user.name}`,
    });
  });
});

// Rota para criar um novo usuário
router.post("/", (req, res) => {
  const { name, email } = req.body;

  User.create(name, email, (err, newUser) => {
    if (err) {
      console.error("Erro ao criar usuário:", err);
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
    res.redirect("/users");
  });
});

// Rota para atualizar um usuário por ID
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  User.update(userId, name, email, (err, updatedUser) => {
    if (err) {
      console.error(`Erro ao atualizar usuário com ID ${userId}:`, err);
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso", user: updatedUser });
  });
});

// Rota para renderizar o formulário de edição de usuário
router.get("/:id/edit", (req, res) => {
  const userId = parseInt(req.params.id);
  User.findById(userId, (err, user) => {
    if (err) {
      console.error(
        `Erro ao buscar usuário com ID ${userId} para edição:`,
        err
      );
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.render("users/edit", { title: "Editar Usuário", user });
  });
});

// Rota para deletar um usuário por ID
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  User.delete(userId, (err) => {
    if (err) {
      console.error(`Erro ao deletar usuário com ID ${userId}:`, err);
      return res.status(500).json({ message: "Erro ao deletar usuário" });
    }
    res.status(204).send();
  });
});

module.exports = router;
