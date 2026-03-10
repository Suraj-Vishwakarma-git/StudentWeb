import React from "react";
import img from "./loginGemi.png";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <img src={img} className="login-image" />

      <form className="login-form">

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
        />

        <input
          type="password"
          placeholder="Enter your Password"
          className="input"
        />

        <button className="login-btn">Login</button>

      </form>
    </div>
  );
};

export default Login;