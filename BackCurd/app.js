const express= require("express");
const mongoose=require("mongoose");
const apirouter= require("./router/router.js")
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api',apirouter);

const mongooseConnected= async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/reactedata");
        console.log("connected");
    } catch(err){
        console.log("op");
        console.log(err.message);
    }
}
app.get("/",(req,res)=>{
    res.send("hi")
})
const PORT = 8001;

app.listen(PORT,()=>{
   
   mongooseConnected();
    console.log("server is running on port",PORT);
})