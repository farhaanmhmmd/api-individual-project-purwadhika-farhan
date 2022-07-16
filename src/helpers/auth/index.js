const pool = require("../../lib/database");
const {verifyToken} = require("../../lib/token");

const auth = async (req, res, next) => {
  try {
    const token = req.token;

    const verifiedToken = verifyToken(token);

    const connection = pool.promise();

    const sqlGetUser = `SELECT user_id, username FROM user WHERE user_id = ?`;
    const dataGetUser = [verifiedToken.user_id];
    const [resGetUser] = await connection.query(sqlGetUser, dataGetUser);

    if (!resGetUser.length) throw {message: "User not found"};

    const {user_id, username} = resGetUser[0];
    req.user = {user_id, username};
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {auth};
