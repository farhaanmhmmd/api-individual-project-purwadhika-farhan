const express = require("express");
const app = express();
const port = 2104;
const bearerToken = require("express-bearer-token");
const cors = require("cors");
// ROUTERS
const userRouter = require("./routers/user");

app.use(cors()); // memperbolehkan untuk diakses dari origin yang berbeda
app.use(bearerToken()); // agar dapat mengakses token di req.token
app.use("/public", express.static("public")); // mengizinkan folder public di akses
app.use(express.json()); // agar dapat mengakses data yg dikiirm di req.body

app.get("/", (req, res) => {
  res.send("API JALAN MZ 🚀");
});

app.use("/users", userRouter);

// error handler
app.use((error, req, res, next) => {
  console.log({error});

  const errorObj = {
    status: "Error",
    message: error.message,
    detail: error,
  };

  const httpCode = error.code ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

app.listen(port, (error) => {
  if (error) return console.log({err: error.message});
  console.log(`API berhasil running di port ${port}`);
});
