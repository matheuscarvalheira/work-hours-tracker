const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/new", userController.newUser);
router.get("/", userController.listUsers);
router.get("/:id", userController.userDetails);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.get("/:id/edit", userController.editUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
