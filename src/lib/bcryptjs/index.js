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
