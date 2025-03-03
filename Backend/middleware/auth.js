const passport = require("passport");
const extractDetailsFromEmail = require("../utils/extractDetails");

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleAuthCallback = passport.authenticate("google", { failureRedirect: "/" });

const processUser = (req, res, next) => {
  if (!req.user) {
    console.error("Authentication failed: req.user is undefined");
    return res.status(401).json({ error: "Authentication failed" });
  }
    
    req.tempUser = extractDetailsFromEmail(req.user);
    console.log("Extracted User Details:", req.tempUser);
    next();
};

const logout = (req, res) => {
  req.logout(() => res.send("Logged out successfully!"));
};

module.exports = { googleAuth, googleAuthCallback, processUser, logout };
