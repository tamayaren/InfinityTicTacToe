const express = require("express");
const router = express.Router();

const {
    create, deletePlayer, getAll, updateData, getPlayer, login
} = require("../controllers/player_controller");

router.post("/register", create);
router.get("/", getAll);
router.get("/:id", getPlayer);
router.post("/login", login);
router.post("/update/:id", updateData);
router.delete("/:id", deletePlayer)

module.exports = router;

