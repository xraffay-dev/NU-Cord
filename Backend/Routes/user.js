const { Router } = require("express");
const { googleAuth, googleAuthCallback, logout, processUser } = require("../middleware/auth");
const { signIn } = require("../Controllers/user");

const router = Router();

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback, processUser);
router.post("/signIn", signIn);
router.get("/logout", logout);

module.exports = router;
