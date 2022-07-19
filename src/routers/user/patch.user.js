const express = require("express");
const router = express.Router();
const {isFieldEmpties} = require("../../helpers");
const {auth} = require("../../helpers/auth");
const pool = require("../../lib/database");
const {uploadAvatar} = require("../../lib/multer");

const updateUserController = async (req, res, next) => {
  try {
    const {user_id} = req.user;
    const {username, firstName, lastName, age, gender} = req.body;

    const emptyFields = isFieldEmpties({
      username,
      // firstName,
      // lastName,
      // age,
      // gender
    });

    if (emptyFields.length) {
      throw {
        code: 400,
        message: `Empty fields :  ${emptyFields}`,
        data: {result: emptyFields},
      };
    }

    const connection = pool.promise();

    const sqlGetUsername = `SELECT username FROM user WHERE username = ?`;
    const dataGetUsername = [username];
    const [resGetUsername] = await connection.query(
      sqlGetUsername,
      dataGetUsername
    );

    if (resGetUsername.length)
      throw {code: 401, message: "username is already used"};

    // if (age >= 100) throw {code: 401, message: "Age is invalid"};

    const sqlUpdateUser = `UPDATE user SET ? WHERE user_id = ?`;
    const dataUpdateUser = [
      {
        username,
        first_name: firstName,
        last_name: lastName,
        age,
        gender,
      },
      user_id,
    ];

    const [resUpdateUSer] = await connection.query(
      sqlUpdateUser,
      dataUpdateUser
    );

    if (!resUpdateUSer.affectedRows) throw {message: "Failed to update user"};

    res.send({
      status: "Success",
      message: "Success update user",
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatarController = async (req, res, next) => {
  try {
    const {user_id} = req.user;
    const {filename} = req.file;
    const connection = pool.promise();

    const finalFileName = `/public/avatar/${filename}`;
    const sqlUpdateAvatar = `UPDATE user SET ? WHERE user_id = ?`;
    const dataUpdateAvatar = [{image: finalFileName}, user_id];
    const [resUpdateAvatar] = await connection.query(
      sqlUpdateAvatar,
      dataUpdateAvatar
    );

    if (!resUpdateAvatar.affectedRows)
      throw {message: "Failed to update avatar"};

    res.send({
      status: "Success",
      message: "Success update avatar",
    });
  } catch (error) {
    next(error);
  }
};

router.patch("/", auth, updateUserController);
router.patch(
  "/avatar",
  auth,
  uploadAvatar.single("avatar"),
  updateUserAvatarController
);

module.exports = router;
