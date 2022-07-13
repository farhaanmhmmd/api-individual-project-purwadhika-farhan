const bcrypt = require("bcryptjs");

const hash = (value) => bcrypt.hashSync(value);
const compare = (value, hash) => bcrypt.compareSync(value, hash);

module.exports = {hash, compare};

const hashDetail = (value) => {
  const encrypted = bcrypt.hashSync(value);
  return encrypted;
};

const compareDetail = (value, hash) => {
  const isMatch = bcrypt.compareSync(value, hash);
  return isMatch;
};

// Encrypt : value --> encrypted value
// const encrypted = bcrypt.hashSync("namakamu");
// namakamu : '$2a$10$DMCEmXz/FFN3fJGXtkukfePrztqQipUCoCMKIA/D45MPJWtG.ECSm'
// console.log({ encrypted });

// Compare : mencocokkan value dengan encrypted data
// const password = "namakamu";
// const isMatch = bcrypt.compareSync(password, encrypted);
// console.log({ isMatch });
