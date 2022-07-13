const express = require("express");
const router = express.Router();

const postUserRouter = require("./post.user");

router.use(postUserRouter);

module.exports = router;
