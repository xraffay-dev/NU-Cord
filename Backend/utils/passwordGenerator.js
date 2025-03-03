const crypto = require("crypto");

const generateRandomPassword = (length = 12) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
    return Array.from(crypto.randomFillSync(new Uint8Array(length)))
        .map(x => chars[x % chars.length])
        .join('');
};

module.exports = generateRandomPassword;
