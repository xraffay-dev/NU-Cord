const { Router } = require("express");
const {
  googleAuth,
  googleAuthCallback,
  processUser,
  testGoogleAuth,
} = require("../middleware/authMiddleware");
const { signIn, logout } = require("../controllers/userController");

const router = Router();

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback, processUser);
router.post("/auth/google/test", testGoogleAuth);
router.post("/signIn", signIn);
router.get("/logout", logout);

module.exports = router;
