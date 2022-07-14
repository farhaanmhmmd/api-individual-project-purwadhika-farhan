const express = require("express");
const router = express.Router();
const {isFieldEmpties} = require("../../helpers");
const {auth} = require("../../helpers/auth");
const pool = require("../../lib/database");

const updateUserController = async (req, res, next) => {
  try {
    const {user_id} = req.user;
    const {firstName, lastName, age, gender, phone} = req.body;

    const emptyFields = isFieldEmpties({
      firstName,
      lastName,
      age,
      gender,
      phone,
    });

    if (emptyFields.length) {
      throw {
        code: 400,
        message: `Empty fields :  ${emptyFields}`,
        data: {result: emptyFields},
      };
    }

    const connection = pool.promise();

    // check phone
    const sqlGetPhone = `SELECT phone FROM user WHERE phone = ?`;
    const dataGetPhone = [phone];
    const [resGetPhone] = await connection.query(sqlGetPhone, dataGetPhone);

    if (resGetPhone.length)
      throw {code: 401, message: "Phone number is already used"};

    // update user
    const sqlUpdateUser = `UPDATE user SET ? WHERE user_id = ?`;
    const dataUpdateUser = [
      {first_name: firstName, last_name: lastName, age, gender, phone},
      user_id,
    ];

    const [resUpdateUSer] = await connection.query(
      sqlUpdateUser,
      dataUpdateUser
    );

    //  affectedRows adalah jumlah baris yang terupdate
    if (!resUpdateUSer.affectedRows) throw {message: "Failed to update user"};

    res.send({
      status: "Success",
      message: "Success update user",
    });
  } catch (error) {
    next(error);
  }
};

router.patch("/", auth, updateUserController);

module.exports = router;
