const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

const bodyParser = require("body-parser");

app.use(bodyParser.json()); //req.body

const PORT = process.env.PORT || 3000;

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`
  );
  next(); //Move to next phase
};

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", localAuthMiddleware, function (req, res) {
  res.send("Hello BOB Welcome to our Hotel");
});
// app.get("/chicken", (req, res) => {
//   res.send("CHICKEN IS THERE BOBBBB");
// });
// app.get("/idly", (req, res) => {
//   res.send("IDLY IS THERE BOBBBB");
// });

//Import routrs files
const menuItemRoutes = require("./routes/menuItemRoutes");
const personRoutes = require("./routes/personRoutes");

//use the routers
app.use("/menu", menuItemRoutes);
app.use("/person", personRoutes);

app.listen(3000, () => {
  console.log("Listining on Port 3000");
});
