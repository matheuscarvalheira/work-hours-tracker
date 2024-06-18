const express = require("express");
const router = express.Router();
const hourController = require("../controllers/hourController");

router.get("/new", hourController.newHour);
router.get("/", hourController.listHours);
router.get("/:userId", hourController.hoursByUser);
router.post("/", hourController.createHour);

module.exports = router;
