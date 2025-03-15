const { registerUserToServer } = require("../services/serverService");

const registerUserToServerController = async (req, res) => {
  try {
    const { userId, batch, major, campus } = req.body;

    if (!userId || !batch || !major || !campus) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await registerUserToServer(userId, batch, major, campus);

    res.status(200).json({ message: "User registered to server successfully" });
  } catch (error) {
    console.error("Error in registerUserToServerController:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = { registerUserToServerController };