const mongoose =require("mongoose");

const Schema=mongoose.Schema;

const userSchema=new Schema({
    id:{
        type:Schema.ObjectId,
        default:function (){
            return this._id
        }
    },
    firstname:{
        type:String,
        
    },
    lastname:{
       type:String
    },
    email:{
        type:String
    },
    date:{
        type:String
    },
    education:{
        type:String
    },
    location:{
        type:String
    },
    about:{
        type:String
    }

},{
    timestamps:true
})

const student=mongoose.model("student",userSchema);

module.exports=student;