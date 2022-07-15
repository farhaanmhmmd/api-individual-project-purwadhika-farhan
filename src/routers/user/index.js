const express = require("express");
const router = express.Router();

const getUserRouter = require("./get.user");
const postUserRouter = require("./post.user");
const patchUserRouter = require("./patch.user");

router.use(getUserRouter);
router.use(postUserRouter);
router.use(patchUserRouter);

module.exports = router;
