const crypto = require("crypto");

const generateShortURL = (length) => {
   return crypto.randomBytes(length).toString("hex").slice(0, length);
};

module.exports = { generateShortURL };
