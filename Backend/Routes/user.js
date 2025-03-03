const { Router } = require("express");
const { googleAuth, googleAuthCallback, logout, processUser } = require("../middleware/auth"); // ✅ Correct import
const { signUpOrLogin } = require("../Controllers/user");

const router = Router();

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback, processUser, signUpOrLogin);
router.get("/logout", logout);

module.exports = router;
