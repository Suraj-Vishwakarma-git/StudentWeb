import mongoose, { Mongoose } from "mongoose";

const studyPlan=mongoose.model("studyPlan",new mongoose.Schema({
     userId:mongoose.Schema.Types.ObjectId,
     subject:String,
     topics:String
}));

export default studyPlan;