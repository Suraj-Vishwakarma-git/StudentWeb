import express from "express";
import DataBase from "./db.js";
import authRoutes from "./authRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const server=express();
server.use(express.json());
server.use(cors());
DataBase();

server.use("/study",authRoutes);

server.get("/",(req,res)=>{
    res.json({message:"Hellow"});
});


server.listen(3000,()=>{
    console.log("ServerRunning")
})
