require("dotenv").config();
const nodemailer = require("nodemailer");

const {CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN} = process.env;

const courier = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "farhanmhmmd96@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

const sendMail = async ({email, token}) => {
  const mail = {
    from: "Twitlite Registration Admin <farhanmhmmd96@gmail.com>",
    to: `${email}`,
    subject: "Twitlite Email Verification",
    html: `<h1>Click this <a href="http://localhost:2104/users/verification/${token}">link</a> to verify your email</h1>`,
  };

  try {
    await courier.sendMail(mail);
    console.log("Email sent");
  } catch (error) {
    throw error;
  }
};

module.exports = {sendMail};
