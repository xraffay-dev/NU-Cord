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

const testGoogleAuth = async (req, res) => {
  try {
    console.log("📨 Received Google Auth Test Request:", req.body);

    // Mock Google Profile Data
    const userProfile = {
      emails: [{ value: req.body.email }], // Simulating Google's email field
      name: {
        familyName: req.body.familyName,
        givenName: req.body.givenName,
      },
    };

    const result = await signUpOrLoginService(userProfile);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(200).json({
      message: "Google OAuth Simulation Successful",
      user: result.user,
    });
  } catch (error) {
    console.error("❌ Error in testGoogleAuth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  googleAuth,
  googleAuthCallback,
  processUser,
  testGoogleAuth,
};
