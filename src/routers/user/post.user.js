const express = require("express");
const router = express.Router();
const {isFieldEmpties} = require("../../helpers");
const pool = require("../../lib/database");
const {hash, compare} = require("../../lib/bcryptjs");
const {createToken} = require("../../lib/token");

const registerUserController = async (req, res, next) => {
  try {
    const {username, email, password} = req.body; // dari client

    const emptyFields = isFieldEmpties({username, email, password});

    if (emptyFields.length) {
      throw {
        code: 400,
        message: `Empty fields :  ${emptyFields}`,
        data: {result: emptyFields},
      };
    }

    // mendapatkan connection
    const connection = pool.promise();

    const sqlGetUser = `SELECT username, email FROM user WHERE username = ? OR email = ?`;
    const dataGetUser = [username, email];
    const [resGetUser] = await connection.query(sqlGetUser, dataGetUser);

    // jika mendapatkan user berdasarkan username atau email
    if (resGetUser.length) {
      const user = resGetUser[0];

      if (user.username == username) {
        throw {
          code: 400,
          message: "Username is already exists",
        };
      } else {
        throw {
          code: 400,
          message: "Email is already exists",
        };
      }
    }

    // checking password (Regular Expression)

    // hash password
    const encryptedPassword = hash(password);

    const sqlCreateUser = `INSERT INTO user SET ?`;
    const dataCreateUser = [{username, email, password: encryptedPassword}];

    const [resCreateUser] = await connection.query(
      sqlCreateUser,
      dataCreateUser
    );

    res.send({
      status: "Success",
      message: "Success create new user",
      data: {
        result: resCreateUser,
      },
    });
  } catch (error) {
    next(error); // error akan diteruskan ke error handler di index.js
  }
};

const loginUserController = async (req, res, next) => {
  try {
    // get user by email
    // if not found, send error, user not found
    const {email, password} = req.body;

    const connection = pool.promise();

    const sqlGetUser = `SELECT user_id, username, password FROM user WHERE email = ?`;
    const dataGetUser = [email];
    const [resGetUser] = await connection.query(sqlGetUser, dataGetUser);

    if (!resGetUser.length) {
      throw {
        code: 404,
        message: `Can not find account with this email`,
      };
    }
    // compare password
    // if doesn't match, send error
    const user = resGetUser[0];

    const isPasswordMatch = compare(password, user.password);

    if (!isPasswordMatch) {
      throw {
        code: 401,
        message: `Password is incorrect`,
      };
    }

    // generate token
    // send response with token
    const token = createToken({
      user_id: user.user_id,
      username: user.username,
    });

    res.send({
      status: "Success",
      message: "Login Success",
      data: {
        result: {user_id: user.user_id, username: user.username, token},
      },
    });
  } catch (error) {
    next(error);
  }
};

router.post("/", registerUserController);
router.post("/login", loginUserController);

module.exports = router;
