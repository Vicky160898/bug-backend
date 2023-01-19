require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const UserModel = require("../models/userSchema");
const argon2 = require("argon2");
const app = express.Router();

//signup routes....
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await argon2.hash(password);
    const users = new UserModel({
      email,
      password: hash,
    });
    await users.save();
    res.status(201).send({ message: "Singup successfully" });
  } catch (err) {
    res.status(401).send("INVALID CREDENTIALS");
  }
});

// login route...
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  try {
    if (await argon2.verify(user.password, password)) {
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "7days",
        }
      );
      //console.log(token);
      res.status(201).send({ message: "login successfully", token: token });
    } else {
      res.status(401).send("INVALID CREDENTIALS");
    }
  } catch (err) {
    res.status(401).send("INVALID CREDENTIALS");
  }
});

module.exports = app;
