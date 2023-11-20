const { addstudent } = require("../db/dbactions");
const express = require ('express');
const { validCity } = require("../helperfunction");
const router = express.Router();

router.post('/' ,async (req, res)=> {
    try {
      const { name, city, seatno } = req.body;
      let result ;
      result = await validCity(city)
      if(!result){
        res
          .status(405)
          .json({ success: false, message: "Not valid City" });
      }else{
        await addstudent(name, city,seatno);
        res
        .status(200)
        .json({ success: true, message: "Contact added successfully" });
      }
      
    } catch (error) {
      console.error("Error:", error);
    }
  });

module.exports= router