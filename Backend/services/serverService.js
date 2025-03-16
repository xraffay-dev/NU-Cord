const Server = require("../models/server");
const Batch = require("../models/batch");
const Major = require("../models/major");
const Campus = require("../models/campus");

const registerUserToServer = async (user, batchId, majorId, campusId) => {
  try {
    const batch = await Batch.findById(batchId);
    const major = await Major.findById(majorId);
    const campus = await Campus.findById(campusId);

    if (!batch || !major || !campus) {
      throw new Error("Batch, Major, or Campus not found.");
    }

    const serverID = `${batch.year}-${major.name}-${campus.name}`;
    let server = await Server.findOne({ serverID });

    if (!server) {
      server = new Server({
        serverID,
        name: serverID, 
        users: [user._id],
      });
      await server.save();
      console.log(`✅ New server created: ${server.name}`);
    } else {
      if (!server.users.includes(user._id)) {
        server.users.push(user._id);
        await server.save();
        console.log(`✅ User added to existing server: ${server.name}`);
      } else {
        console.log(`ℹ️ User already in server: ${server.name}`);
      }
    }
  } catch (error) {
    console.error("❌ Error in registerUserToServer:", error.message);
  }
};

module.exports = { registerUserToServer };
