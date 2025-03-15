const { signUpOrLoginService, signInService } = require("../services/userService");

const signUpOrLogin = async (req, res) => {
  try {
    const result = await signUpOrLoginService(req.user);
    res.json({ message: "Signup/Login successful", user: result.user });
  } catch (error) {
    console.error("Error in signUpOrLogin:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await signInService(username, password);
    res.status(200).json({ message: "Sign in successful", user });
  } catch (error) {
    console.error("Error in signIn:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    console.log("Logged out successfully");
    res.json({ message: "Logged out successfully" });
  });
};

module.exports = { signUpOrLogin, signIn, logout };