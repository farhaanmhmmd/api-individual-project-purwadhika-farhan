const express = require("express");
const router = express.Router();

const postUserRouter = require("./post.user");
const patchUserRouter = require("./patch.user");

router.use(postUserRouter);
router.use(patchUserRouter);

module.exports = router;
