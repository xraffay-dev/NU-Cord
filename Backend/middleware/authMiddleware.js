const passport = require("passport");
const { signUpOrLogin } = require("../controllers/userController");

const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

const googleAuthCallback = passport.authenticate("google", { session: false });

const processUser = async (req, res) => {
  if (!req.user) {
    console.error("Authentication failed: No user object");
    return res.status(401).json({ error: "Authentication failed" });
  }
  await signUpOrLogin(req, res);
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};

module.exports = { googleAuth, googleAuthCallback, processUser, logout };
