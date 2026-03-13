import mongoose from "mongoose";
const User=mongoose.model("User",new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,reqired:true}
},
{timestamps:true}
));

export default User;