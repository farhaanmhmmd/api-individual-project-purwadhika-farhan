const pool = require("../../lib/database");
const {verifyToken} = require("../../lib/token");

const auth = async (req, res, next) => {
  try {
    // get token
    const token = req.token;
    // verify token
    // verifiedToken: { user_id: 41, username: 'bean999', iat: 1656909883 }
    const verifiedToken = verifyToken(token);

    const connection = pool.promise();

    const sqlGetUser = `SELECT user_id FROM user WHERE user_id = ?`;
    const dataGetUser = [verifiedToken.user_id];
    const [resGetUser] = await connection.query(sqlGetUser, dataGetUser);

    if (!resGetUser.length) throw {message: "User not found"};

    req.user = {user_id: resGetUser[0].user_id};
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {auth};
