const expresss = require("express");
const app = expresss();

const db = require("./db");

const Person = require("./models/Person");

const bodyParser = require("body-parser");

app.use(bodyParser.json()); //req.body

app.get("/", function (req, res) {
  res.send("Hello BOB Welcome to our Hotel");
});
// app.get("/chicken", (req, res) => {
//   res.send("CHICKEN IS THERE BOBBBB");
// });
// app.get("/idly", (req, res) => {
//   res.send("IDLY IS THERE BOBBBB");
// });

const menuItemRoutes = require("./routes/menuItemRoutes");
const personRoutes = require("./routes/personRoutes");

app.use("/", menuItemRoutes);
app.use("/person", personRoutes);

app.listen(3000, () => {
  console.log("Listining on Port 3000");
});
