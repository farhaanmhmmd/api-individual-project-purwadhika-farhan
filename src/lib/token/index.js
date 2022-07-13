const jwt = require("jsonwebtoken");
const SECRET_WORD = "strong_mountain";

const createToken = (payload) => jwt.sign(payload, SECRET_WORD);
const verifyToken = (token) => jwt.verify(token, SECRET_WORD);

module.exports = {createToken, verifyToken};
