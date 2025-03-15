const passport = require("passport");
const { signUpOrLoginService } = require("../services/userService");
const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});
const googleAuthCallback = passport.authenticate("google", { session: false });

const processUser = async (req, res) => {
  if (!req.user) {
    console.error("Authentication failed: No user object");
    return res.status(401).json({ error: "Authentication failed" });
  }

  const result = await signUpOrLoginService(req.user);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  // res.json({ message: "Signup/Login successful", user: result.user });
  res.redirect("/");
};



module.exports = { googleAuth, googleAuthCallback, processUser};
