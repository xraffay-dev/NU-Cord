const User = require("../Models/user");
const initializeDbs = require("../utils/initializeDbs");
const extractDetailsFromEmail = require("../utils/extractDetails");
const registerUserToServer = require("./server")

const signUpOrLogin = async (req, res) => {
  try {
    if (!req.user?.emails?.[0]) {
      return res.status(400).json({ error: "User authentication failed" });
    }

    const userDetails = extractDetailsFromEmail(req.user);

    let user = await User.findOne({ email: userDetails.email });

    if (!user) {
      const { batch, campus, academicDegree, major } = await initializeDbs(userDetails);
      
      user = new User({
        ...userDetails,
        batch,
        campus,
        academicDegree,
        major,
      });

      await user.save();
      console.log(`New user created: ${user.username}`);
      registerUserToServer(user, userDetails.batch, userDetails.major, userDetails.campus);

    } else {
      console.log(`User already exists: ${user.username}`);
    }

    res.json({ message: "Signup/Login successful", user });
  } catch (error) {
    console.error("Error in signUpOrLogin:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { signUpOrLogin };
