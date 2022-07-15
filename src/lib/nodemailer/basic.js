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

const mail = {
  from: "Twitlite Registration Admin <farhanmhmmd96@gmail.com>",
  to: "farhanmhmmd96@gmail.com",
  subject: "Twitlite Email Verification",
  html: `<h1>Click this link to verify your email</h1>`,
};

const sendMail = async () => {
  try {
    await courier.sendMail(mail);
    console.log("email berhasil dikirim");
  } catch (error) {
    console.log({error});
  }
};

sendMail();
