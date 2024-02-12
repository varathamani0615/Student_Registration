const express =require("express");
const Student=require("../model/studentmode.js")
const router=express.Router();

router.get("/",async(req,res)=>{
   if(req.query.id){
    // const id=req.query.id;
    // Student.findById(id).then(data=>{
    //   if(!data){
    //     res.status(404).send({message:"not found user with id "+id})
    //   }else{
    //     res.send(data)
    //   }
    // }).catch(err=>{
    //   res.status(500).send({message:"erroe retrieving user with id"+id})
    // })
   }
   else{
    Student.find().then(data=>{
      res.send(data)
    }).catch(err=>{
      res.status(500).send({message:err.message || "Error occurred while retriving user information"})
    })
   }
  
});
router.get("/:id",(req,res)=>{
   const id=req.params.id;
   Student.findById(id).then(data=>{
    if(!data){
      return res.status(404).send({message:"not found user with id "+id})
    }else{
      res.send(data)
    }
   }).catch(err=>{
    res.status(500).send({message:"error....."})
   })
})
router.post("/post",(req,res)=>{
   
     if(!req.body){
      res.status(400).send({message:"content cannot be empty"})
      return
     }

     const student= new Student({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      date:req.body.date,
      education:req.body.education,
      location:req.body.location,
      about:req.body.about
     })

     student.save().then(data=>{res.send(data)}).catch(err=>{
      res.status(500).send({messgae:err.message || "some error occurred while creating a create operation"})
    })
   
});

router.put("/put/:id",(req,res)=>{
  if(!req.body){
    return res.status(400).send({message:"data to update can not be empty"})
  }
 const id=req.params.id;
 Student.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data=>{
  if(!data){
    res.status(404).send({message:`connent update user with ${id}. maybe user nit found!`})
  }else{
    res.send(data)
  }
 }).catch(err=>{
  res.status(500).send({message:"error update user information"})
 })
})

router.delete("/del/:id",(req,res)=>{
  const id =req.params.id;
  Student.findByIdAndDelete(id).then(data=>{
    if(!data){
      res.status(404).send({message:`cannot delete with id ${id}. maybe id is wrong` })
    }else{
      res.send({message:"user was deleted successfully !"})
    }
  }).catch(err=>{
    res.status(500).send({message:"could not delete user with id"+id+err})
  })
})

module.exports=router;