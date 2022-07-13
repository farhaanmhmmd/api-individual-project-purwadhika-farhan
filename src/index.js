const express = require("express");
const app = express();
const port = 2104;

// ROUTERS
const userRouter = require("./routers/user");

app.use(express.json());

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
