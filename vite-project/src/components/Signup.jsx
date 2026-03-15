import React, { useState } from 'react'
import "./Signup.css";
import img from "./signupgemi.png";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const navigate=useNavigate();
  
   async function signup() {
    const API=await fetch("http://localhost:4000/signup",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,email,password})
    });
    const data=await API.json();
    alert(data.message);
    if(data.message==="Account Created Successfully"){
      navigate("/login");
    }
   }

  return (
    <div>
      <div className="login-container">
         <img src={img} className="login-image" />
      <div className="login-form">
         <input
          type="text"
          placeholder="Enter your Name"
          className="input"
          onChange={(e)=>setname(e.target.value)}
        />

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

        <button className="login-btn"  onClick={signup}>Signup</button>
      </div>

    </div>
    </div>
  )
}

export default Signup
