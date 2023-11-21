const { addCenter } = require("../db/dbactions");
const express = require("express");
const { validCity } = require("../helperfunction");
const router = express.Router();

router.post("/addCenter", async (req, res) => {
  try {
    const {city} = req.body;
    let result = await validCity(city);
    if (!result) {
      res.status(405).json({ success: false, message: "Not valid City" });
    } else {
      await addCenter(city,result);
      res
        .status(200)
        .json({ success: true, message: "Center added successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

router.post("/getcenterdetails", async (req, res) => {
  try {
    const {city} = req.body;
    let result = await validCity(city);
    if (!result) {
      res.status(405).json({ success: false, message: "Not valid City" });
    } else {
      await addCenter(city,result);
      res
        .status(200)
        .json({ success: true, message: "Center added successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});


module.exports = router;
