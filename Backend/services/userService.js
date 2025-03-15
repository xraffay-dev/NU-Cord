const bcrypt = require("bcryptjs");
const User = require("../models/user");
const initializeDbs = require("../utils/dbSetup");
const encryptPassword = require("../utils/helpers/encryptPassword");
const extractDetailsFromEmail = require("../utils/helpers/extractDetails");
const isValidFastNuEmail = require("../utils/validators/emailValidator");
const { registerUserToServer } = require("./serverService");

const signUpOrLoginService = async (userProfile) => {
  const validEmail = isValidFastNuEmail(userProfile.emails[0].value);
  if (!validEmail) {
    console.error("Authentication failed: Invalid Email");
    return { error: "Authentication failed: Invalid Email" }; // Return error instead of throwing
  }

  const userDetails = extractDetailsFromEmail(userProfile);
  let user = await User.findOne({ email: userDetails.email });

  if (!user) {
    const { batch, campus, academicDegree, major } = await initializeDbs(
      userDetails
    );

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
    await registerUserToServer(
      user,
      userDetails.batch,
      userDetails.major,
      userDetails.campus
    );
  } else {
    console.log(`User already exists: ${user.username}`);
  }

  return { user };
};

const signInService = async (username, password) => {
  const user = await User.findOne({ username })
    .populate("batch", "year")
    .populate("campus", "name")
    .populate("academicDegree", "name")
    .populate("major", "name");

  if (!user) {
    throw { statusCode: 400, message: "Invalid username" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { statusCode: 400, message: "Invalid password" };
  }

  console.log(`✅ User signed in: ${user.username}`);

  return {
    username: user.username,
    name: user.name,
    email: user.email,
    batch: user.batch.year,
    campus: user.campus.name,
    academicDegree: user.academicDegree.name,
    major: user.major.name,
  };
};
module.exports = { signUpOrLoginService, signInService };
