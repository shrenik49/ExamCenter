const express = require("express");
const { addstudent, getStudent, deleteStudentById, getCenter } = require("../services/dbservices");
const { getExamCenter, getCoordinates } = require("../utils/helpers");
const studentRoute = express.Router();

  studentRoute.get("/center", async (req, res) => {
    try {
      const id = req.query.id;
      const city = await getStudent(id);
      if (city) {
        const coordinates = await getCoordinates(city);
        let nearestCity = await getCenter(coordinates)
        res.status(200).json({ success: true, data: nearestCity });
      } else {
        res.status(404).json({ success: false, message: "Student not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

module.exports = studentRoute;
