const express = require("express");
const { connection } = require("./Configs/db");
const { authenticate } = require("./middleware/authenticate.middleware");
const { postRouter } = require("./Routes/Post.routes");
const { userRouter } = require("./Routes/User.routes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log("Server running at " + process.env.port);
});
