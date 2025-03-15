const bcrypt = require("bcryptjs");
const User = require("../models/user");
const initializeDbs = require("../utils/dbSetup");
const encryptPassword = require("../utils/helpers/encryptPassword");
const extractDetailsFromEmail = require("../utils/helpers/extractDetails");
const isValidFastNuEmail = require("../utils/validators/emailValidator");
const registerUserToServer = require("./serverController");

const signUpOrLogin = async (req, res) => {
  try {

    let validEmail = isValidFastNuEmail(req.user.emails[0].value);
    if (!validEmail) {
      console.error("Authentication failed: Invalid Email");
      return res.status(401).json({ error: "Authentication failed" });
    }

    console.log("Valid Email Entered.");

    const userDetails = extractDetailsFromEmail(req.user);
    let user = await User.findOne({ email: userDetails.email });
    if (!user) {
      const { batch, campus, academicDegree, major } = await initializeDbs(
        userDetails
      );

      //Encrypting the password
      userDetails.password = await encryptPassword(userDetails.password);

      user = new User({
        ...userDetails,
        batch,
        campus,
        academicDegree,
        major,
      });

      await user.save();
      console.log(`New user created: ${user.username}`);
      registerUserToServer(
        user,
        userDetails.batch,
        userDetails.major,
        userDetails.campus
      );
    } else {
      console.log(`User already exists: ${user.username}`);
    }

    res.json({ message: "Signup/Login successful", user });
  } catch (error) {
    console.error("Error in signUpOrLogin:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    console.log(`✅ User signed in: ${user.username}`);
    res.status(200).json({ message: "Sign in successful", user });
  } catch (error) {
    console.error("Error in signIn:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { signUpOrLogin, signIn };
