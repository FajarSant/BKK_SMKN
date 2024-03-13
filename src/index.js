const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db")
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
dotenv.config();

const usercontroller = require ("./user/user.controller")
app.use('/users', usercontroller)

const postcontrollers = require ("./post/post.controller")
app.use ("/posts", postcontrollers)

app.get("/api", (req, res) => {
  res.send("API Sedang Berjalan....");
});


app.listen(PORT, () => {
  console.log("Express is running on port:", PORT);
});
