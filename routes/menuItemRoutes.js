const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/menuItem");

router.post("/menu", async (req, res) => {
  try {
    const data = req.body; // assuming the req body contains the person data
    //const newMenu = new MenuItem(data);

    //save newPerson to database

    const response = await MenuItem.insertMany(data);
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal sever error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the id of Menu Item from the URL parameter
    const updatedMenuData = req.body; // Updated data for the Menu Item

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation
    });

    if (!response) {
      return res.status(404).json({ error: "Menu Item not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the Menu's ID from the URL parameter

    // Assuming you have a MenuItem model
    const response = await MenuItem.findByIdAndRemove(menuId);
    if (!response) {
      return res.status(404).json({ error: "Menu Item not found" });
    }
    console.log("data delete");
    res.status(200).json({ message: "Menu Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//comment added for checking purpose

module.exports = router;
