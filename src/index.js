const express = require("express");
const app = express();
const port = 2104;
const bearerToken = require("express-bearer-token");
const cors = require("cors");

const userRouter = require("./routers/user");

app.use(cors());
app.use(bearerToken());
app.use("/public", express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API JALAN MZ 🚀");
});

app.use("/users", userRouter);

app.use((error, req, res, next) => {
  console.log({error});

  const errorObj = {
    status: "Error",
    message: error.message,
    detail: error,
  };

  const httpCode = typeof error.code == "number" ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

app.listen(port, (error) => {
  if (error) return console.log({err: error.message});
  console.log(`API berhasil running di port ${port}`);
});
