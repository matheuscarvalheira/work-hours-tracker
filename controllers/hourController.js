const Hour = require("../model/Hour");
const db = require("../config/database");

const hourController = {
    newHour: (req, res) => {
        const query = "SELECT * FROM hours";

        db.all(query, (err, hours) => {
            if (err) {
                console.error("Erro ao buscar horas:", err.message);
                res.status(500).send("Erro ao buscar horas");
                return;
            }
            res.render("hours/newHour", { title: "Nova Hora", hours: hours });
        });
    },

    listHours: (req, res) => {
        Hour.findAll((err, hours) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao listar horas" });
            }
            res.render("hours/list", { title: "Lista de Horas", hours });
        });
    },

    hoursByUser: (req, res) => {
        const userId = parseInt(req.params.userId);
        Hour.findByUserId(userId, (err, hours) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao buscar horas" });
            }
            res.render("hours/list", { title: "Horas do Usuário", hours });
        });
    },

    createHour: (req, res) => {
        const { userId, date, startTime, endTime } = req.body;

        Hour.create(userId, date, startTime, endTime, (err, newHour) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao registrar hora" });
            }

            res.redirect(req.headers.referer || "/");
        });
    }
};

module.exports = hourController;
