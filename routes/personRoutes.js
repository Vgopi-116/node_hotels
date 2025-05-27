const express = require("express");
const router = express.Router();

const Person = require("../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // assuming the req body contains the person data
    //const newPerson = new Person(data);

    //save newPerson to database

    // const response = await Person.insertMany(data);
    //----
    /// same code as below for response, const newPerson = new Person(data); // Create a new instance
    // await newPerson.save(); // Save the instance

    const response = await Person(req.body).save(); // This triggers the pre-save hook

    console.log("data saved");
    const payload = {
      username: response.username,
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload); // Generate JWT token using the payload
    console.log("Token is :", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal sever error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    //Extractthe username and passowrd from the request body
    const { username, password } = req.body; // Destructuring to get username and password
    console.log("Username:", username);
    console.log("Password:", password);
    //find the user by the username
    const user = await Person.findOne({ username: username });
    console.log("User found:", user);

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        error: "Invalid Username or Password, Please check and try again BOB",
      });
    }

    //Generate JWT Token
    const payload = {
      username: user.username,
      id: user.id,
    };
    const token = generateToken(payload);

    //return token as response
    res.json({ token });
  } catch (err) {
    console.log("Error in login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data:", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("responce Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work Type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extarct id from the URL
    const updatedPersonData = req.body; //updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return the updated document
        runValidators: true, //Run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extarct id from the URL
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("Data Deleted");
    res.status(200).json({ message: "Person deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = router;
