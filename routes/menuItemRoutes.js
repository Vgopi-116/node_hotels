const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/menuItem");

router.post("/menu", async (req, res) => {
  try {
    const data = req.body; // assuming the req body contains the person data
    const newMenu = new MenuItem(data);

    //save newPerson to database

    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal sever error" });
  }
});

router.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = router;
