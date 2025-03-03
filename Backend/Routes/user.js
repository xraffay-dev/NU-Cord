const { Router } = require("express");
const { googleAuth, googleAuthCallback, logout, processUser } = require("../middleware/auth");
const router = Router();

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback, processUser);
router.get("/logout", logout);

module.exports = router;
