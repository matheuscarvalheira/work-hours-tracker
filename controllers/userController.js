const User = require("../model/User");

const userController = {
  newUser: (req, res) => {
    res.render("users/newUser", { title: "Novo Usuário" });
  },

  listUsers: (req, res) => {
    User.findAll((err, users) => {
      if (err) {
        console.error("Erro ao listar usuários:", err);
        return res.status(500).json({ message: "Erro ao listar usuários" });
      }
      res.render("users/list", { title: "Lista de Usuários", users });
    });
  },

  userDetails: (req, res) => {
    const userId = req.params.id;

    User.findById(userId, (err, user) => {
      if (err) {
        console.error(`Erro ao buscar usuário com ID ${userId}:`, err);
        return res.status(500).json({ message: "Erro ao buscar usuário" });
      }
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.render("users/detail", {
        user,
        title: `Detalhes do Usuário - ${user.name}`,
      });
    });
  },

  createUser: (req, res) => {
    const { name, email } = req.body;

    User.create(name, email, (err, newUser) => {
      if (err) {
        console.error("Erro ao criar usuário:", err);
        return res.status(500).json({ message: "Erro ao criar usuário" });
      }
      res.redirect("/users");
    });
  },

  editUser: (req, res) => {
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
  },

  updateUser: (req, res) => {
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
  },

  deleteUser: (req, res) => {
    const userId = parseInt(req.params.id);

    User.delete(userId, (err) => {
      if (err) {
        console.error(`Erro ao deletar usuário com ID ${userId}:`, err);
        return res.status(500).json({ message: "Erro ao deletar usuário" });
      }
      res.status(204).send();
    });
  },
};

module.exports = userController;
