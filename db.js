const mongoose = require("mongoose");

//define mongodb connection URL

const mongoUrl = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongoUrl, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("YOOOOO BOBB Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.log("Error on connecting MongoDB Server");
});

db.on("disconnected", () => {
  console.log("Disconnected to MongoDb Server");
});

module.exports = db;
