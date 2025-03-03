const Server = require("../Models/server");

const registerUserToServer = async (user, batch, major, campus) => {
    console.log("Registering user to server...", user);
    let serverID = `${batch}-${major}-${campus}`;
    console.log(`Server ID: ${serverID}`);

    let server = await Server.findOne({ serverID });
    
    if (!server) {
        server = new Server({
            serverID,
            users: [user._id], 
        });
        await server.save();
        console.log(`✅ New server created: ${server.serverID}`);
    } else {
        if (!server.users.includes(user._id)) {
            server.users.push(user._id);
            await server.save();
            console.log(`User added to existing server: ${server.serverID}`);
        } else {
            console.log(`User already in server: ${server.serverID}`);
        }
    }
};

module.exports = registerUserToServer;
