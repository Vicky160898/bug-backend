require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const connect = require("./config/db");
const UserModel = require("./controllers/routes");
const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
app.use(express.json());
app.use(cors());

app.use("/", UserModel);

app.listen(PORT, async (req, res) => {
  await connect();
  console.log("server started on 8080");
});
