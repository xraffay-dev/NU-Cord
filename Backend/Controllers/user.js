const User = require("../Models/user");

const signUpOrLogin = async (req, res) => {
  try {
    if (!req.tempUser) {
      console.error("Error: No user details extracted");
      return res.status(400).json({ error: "User details missing" });
    }

    const existingUser = await User.findOne({ email: req.tempUser.email });

    if (existingUser) {
      console.log("User found in DB, logging in...");
      return res.json({ message: "Login successful", user: existingUser });
    }

    console.log("🆕 User not found, signing up...");
    const newUser = new User(req.tempUser);
    await newUser.save();

    return res.json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Error in signUpOrLogin:", error);
    res.status(500).json({ error: "Server error in signUpOrLogin" });
  }
};

module.exports = { signUpOrLogin };
