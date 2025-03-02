const { Router } = require("express");
const extractDetailsFromEmail = require("../utils/extractDetails");

const router = Router();

router.post("/signUp", (req, res) => {
  const { email, username, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const details = extractDetailsFromEmail(email);
    if (!details) {
      return res.status(400).json({ error: "Invalid university email" });
    }

    const user = {
      name: details.name,
      username,
      password,
      email,
      batch: details.batch,
      academicDegree: details.academicDegree,
      dept: details.dept,
    };

    console.log("User Created:", user);
    res.status(201).json({ message: "User signed up successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
