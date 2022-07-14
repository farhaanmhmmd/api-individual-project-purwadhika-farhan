const multer = require("multer");
const path = require("path"); // built-in
const appRoot = require("app-root-path");

// avatarPath : '/home/rochafi/bootcamp/api-mysql-2104/public/avatar'
const avatarPath = path.join(appRoot.path, "public", "avatar");

const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarPath);
  },
  filename: function (req, file, cb) {
    const {username} = req.user;
    cb(null, `${username}-avatar.png`);
  },
});

const uploadAvatar = multer({
  storage: storageAvatar,
  limits: {
    fileSize: 10485760, // Byte, 10 MB
  },
  fileFilter(req, file, cb) {
    const allowedExtension = [".png", ".jpg", ".jpeg"];
    //  file.originalname : purwadhika.png
    //  extname : .png
    const extname = path.extname(file.originalname);

    if (!allowedExtension.includes(extname)) {
      const error = new Error("Please upload image file (jpg, jpeg, png)");
      return cb(error);
    }

    cb(null, true);
  },
});

module.exports = {uploadAvatar};
