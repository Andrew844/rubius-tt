const { Router } = require("express");
const router = Router();

const usersController = require("../controllers/users.controller");

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.put("/", usersController.editUser);
router.delete("/", usersController.deleteUser);

module.exports = router;
