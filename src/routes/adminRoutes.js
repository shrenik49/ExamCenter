const express = require("express");
const { deleteStudentById } = require("../services/dbservices");
const { validCity } = require("../utils/helpers");
const { addCenter, deleteCenterByCity } = require("../controller/admin.controller");
const adminrouter = express.Router();

adminrouter.post("/addCenter", async (req, res) => {
  try {
    const { city } = req.body;
    const isValidCity = await validCity(city);
    if (!isValidCity) {
      return res.status(405).json({ success: false, message: "Not a valid city" });
    }
    await addCenter(city,isValidCity);
    return res.status(200).json({ success: true, message: "Center added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

adminrouter.delete("/deleteCenter/:cityName", async (req, res) => {
  try {
    const { cityName } = req.params;
    const deleted = await deleteCenterByCity(cityName);
    if (deleted) {
      return res.status(200).json({ success: true, message: `Center in ${cityName} deleted successfully` });
    } else {
      return res.status(404).json({ success: false, message: `Center in ${cityName} not found` });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

adminrouter.post("/deleteStudent", async (req, res) => {
  try {
    let result = await deleteStudentById(req.body);
    if (!result) {
      res.status(405).json({ success: false, message: "Student Not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Student deleted from database" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

module.exports = adminrouter;
