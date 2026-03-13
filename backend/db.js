import mongoose from "mongoose";

const MyDatabase=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/studentFocus");
        console.log("MongoDB connected");
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default MyDatabase;