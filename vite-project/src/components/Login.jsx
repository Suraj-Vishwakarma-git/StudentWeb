import React, { useState } from "react";
import img from "./loginGemi.png";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {

  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
 
  async function login(){
    const API=await fetch("http://localhost:3000/study/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    });
    const data=await API.json();
    alert(data.message);
  }


  return (
    <div className="login-container">
      <img src={img} className="login-image" />

      <div className="login-form">

        <span style={{display:"flex", alignItems:"center", gap:"10px"}}>
          <h2 style={{margin:0}}>Create New Account</h2>
          <Link to="/signup" style={{textDecoration:"none"}}>
            <h2 style={{margin:0, color:"red"}}>Signup</h2>
          </Link>
        </span>

        <div style={{
          width:"100%",
          height:"1px",
          backgroundColor:"lightgray",
          margin:"15px 0"
        }}></div>

        <h2 style={{marginBottom:"10px"}}>Login</h2>

        <input
          type="email"
          placeholder="Enter your Email"
          className="input"
          onChange={(e)=>setemail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your Password"
          className="input"
          onChange={(e)=>setpassword(e.target.value)}
        />

        <button className="login-btn" onClick={login}>Login</button>

      </div>
    </div>
  );
};

export default Login;