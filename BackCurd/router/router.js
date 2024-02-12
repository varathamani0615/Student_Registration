const express=require("express");
const controll=require("../controlls/studentcontrol.js")
const router=express.Router();

router.use("/student",controll);

module.exports=router;