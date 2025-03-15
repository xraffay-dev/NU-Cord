const { Router } = require("express");
const { registerUserToServerController } = require("../controllers/serverController");

const router = Router();

router.post("/register-to-server", registerUserToServerController);

module.exports = router;