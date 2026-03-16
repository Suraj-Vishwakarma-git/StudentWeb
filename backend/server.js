import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";


const server=express();
server.use(cors());

server.use(express.json());
const JWT_SECRET="SurajVishwakarma";


const connectDB=async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/StudyOsbackend");
        console.log("MongoDB connected");
    }
    catch(e){
        console.log(e);
    }
}

connectDB();

const User=mongoose.model("User",new mongoose.Schema({
    name:String,
    email:String,
    password:String
}));

const StudyPlan=mongoose.model("StudyPlan",new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    subject:{type:String,required:true},
    completed:{
        type:Boolean,
        default:false
    }
}));

const Subjecttopic=mongoose.model("Subjecttopic",new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    subjectId:mongoose.Schema.Types.ObjectId,
    topic:String,
}));

const ExamDate=mongoose.model("ExamDate",new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    subject:String,
    date:Date
}));



const secure=async (req,res,next)=>{
    const authHead=req.headers.authorization;
    if(!authHead) return res.json({message:"No token Provided"});
    const token=authHead.split(" ")[1];
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.userId=decoded.id;
        next();
    }
    catch(e){
        res.json({message:"Invalid Token"});
    }
}


server.get("/",(req,res)=>{
    res.json("Backend started");
});

server.post("/signup",async (req,res)=>{
  const {name,email,password}=req.body;
  if(!name|| !email || !password){
    return res.json("All Fileds are required");
  }
  const findUser=await User.findOne({email});
  if(findUser) return res.json({message:"Account Already exists"});
   const hashed=await bcrypt.hash(password,10);
  const user=await User.create({
    name:name,email:email,password:hashed
  });
  res.json({message:"Account Created Successfully",account:user});
})


server.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user) {
        return res.json({message:"Create Account first"});
    }
    const compare=await bcrypt.compare(password,user.password);
    if(!compare) return res.json({message:"Incorrect Password"});
    const token=jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"7d"});
    res.json({message:"LogedIn Successfully",token:token});
});


server.post("/addsubject",secure,async (req,res)=>{
    const {subject}=req.body;
    const Exist=await StudyPlan.findOne({subject:subject,userId:req.userId});
    if(Exist) return res.json({message:"Subject Already Exist"});
    const Usubject=await StudyPlan.create({userId:req.userId,subject:subject});
    res.json({
        message:"Subject Added",
        Subject:Usubject
    });
})


server.post("/subjecttopic",secure,async (req,res)=>{
    const {topic,subjectId}=req.body;
    const Utopic=await Subjecttopic.create({userId:req.userId,subjectId:subjectId,topic:topic});
    res.json({message:"topic added",topic:Utopic});
})

server.post("/alltopics",secure,async (req,res)=>{
    const {subjectId}=req.body;
    const topics=await Subjecttopic.find({subjectId:subjectId,userId:req.userId});
    if(!topics) return res.json({message:"Topics Not found"});
    res.json({topics});
})



server.get("/allsubjects",secure,async (req,res)=>{
    const subjects=await StudyPlan.find({userId:req.userId});
    if(!subjects) return res.json({message:"Add Subject first"});
    res.json({subjects});
});


server.delete("/deletesubject",secure,async (req,res)=>{
    const {subjectId}=req.body;
    const findsub=await StudyPlan.findOneAndDelete({userId:req.userId,_id:subjectId});
    if(!findsub) return res.json({message:"Subject Not found"});
    const deletetopic=await Subjecttopic.deleteMany({userId:req.userId,subjectId:subjectId});
    res.json({message:"Subject and topics deleted"});
})

server.listen(4000,()=>{
    console.log("Server Started");
})


server.post("/examdate",secure,async (req,res)=>{
    const {date,subject}=req.body;
    const nExamD=await ExamDate.create({
        userId:req.userId,
        subject:subject,
        date:date  
    });
    res.json({message:"Exam Date Added"});
});


server.delete("/deleteexamdate",secure,async (req,res)=>{
    const {examId}=req.body;
    const Delete=await ExamDate.deleteOne({userId:req.userId,_id:examId});
    if(!Delete) return res.json({message:"Invalid Exam Date"});
    res.json({message:"Deleted Exam Date"});
})

server.get("/allexam",secure,async (req,res)=>{
    const data=await ExamDate.find({userId:req.userId});
    res.json({data})
});

server.put("/completedSubject",secure,async (req,res)=>{
    const {subId}=req.body;
    const Subject=await StudyPlan.findByIdAndUpdate(
        subId,
        {completed:true},
         { returnDocument: "after" }
    );
    res.json({message:"Subject Complete"});
});

