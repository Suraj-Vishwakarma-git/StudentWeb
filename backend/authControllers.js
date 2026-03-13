import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./User.js";

export const register = async (req,res) => {

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.json({message:"All fields are required"});
    }

    const findemail = await User.findOne({email});

    if(findemail){
        return res.json({message:"Account already exists"});
    }

    const hashed = await bcrypt.hash(password,10);

    await User.create({
        name,
        email,
        password: hashed
    });

    res.json({message:"Account created successfully"});
};


export const login = async (req,res) => {

    const {email,password} = req.body;

    if(!email || !password){
        return res.json({message:"All fields are required"});
    }

    const finduser = await User.findOne({email});

    if(!finduser){
        return res.json({message:"Please create account first"});
    }

    const isMatch = await bcrypt.compare(password,finduser.password);

    if(!isMatch){
        return res.json({message:"Password incorrect"});
    }

    const token = jwt.sign(
 { id: finduser._id },
 process.env.JWT_SECRET,
 { expiresIn: "7d" }
);

    res.json({
        message:"Logged in successfully",
        token
    });
};