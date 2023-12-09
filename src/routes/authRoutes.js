const express = require('express');
const { RegisterStudent, LoginStudent } = require('../controller/student');

const authRoute = express.Router();

authRoute.post("/register",(req,res)=>{
    let result = RegisterStudent(req.body)
    if(result){
        res
            .status(200)
            .json({ success: true, message: "Contact added successfully" });
    }else{
        res.status(405).json({ success: false, message: "Not valid City" });
    }
});

authRoute.post("/login",async(req,res)=>{
    let token = await LoginStudent(req.body)
    if(token){
        res
            .status(200)
            .json({ success: true, message: "Login Successful" ,token:token});
    }else{
        res.status(405).json({ success: false, message: "Username and Password mismatched" });
    }
})

authRoute.get("/",(req,res)=>{res.json({msg:"hello auth router"})})

module.exports = authRoute 