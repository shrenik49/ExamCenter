const { addstudent, getStudent } = require("../db/dbactions");
const express = require("express");
const { validCity, getExamCenter } = require("../helperfunction");
const router = express.Router();

router.post("/addstudent", async (req, res) => {
  try {
    const { name, city, seatno } = req.body;
    let result;
    result = await validCity(city);
    if (!result) {
      res.status(405).json({ success: false, message: "Not valid City" });
    } else {
      await addstudent(name, city, seatno);
      res
        .status(200)
        .json({ success: true, message: "Contact added successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

router.get("/center", async (req, res) => {
  try {
    const id = req.query.id;
    const city = await getStudent(id);
    if (city) {
        let nearestCity = await getExamCenter(city)
        console.log(city);
        console.log("nearestCity------->",nearestCity);
      res.status(200).json({ success: true, data: nearestCity });
    } else {
      res.status(404).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;
