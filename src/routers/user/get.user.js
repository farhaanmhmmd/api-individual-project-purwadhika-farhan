const express = require("express");
const router = express.Router();
const {auth} = require("../../helpers/auth");
const pool = require("../../lib/database");

const getUserProfileController = async (req, res, next) => {
  try {
    const {user_id} = req.user;

    const connection = pool.promise();
    const sqlGetUser = `SELECT user_id, username, first_name, last_name, email, phone, gender, image FROM user WHERE user_id = ?`;
    const dataGetUser = [user_id];
    const [resGetUser] = await connection.query(sqlGetUser, dataGetUser);

    if (!resGetUser.length) throw {message: "User not found"};

    res.send({
      status: "Success",
      message: "User Profile",
      data: {
        result: resGetUser[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

router.get("/profile", auth, getUserProfileController);

module.exports = router;
