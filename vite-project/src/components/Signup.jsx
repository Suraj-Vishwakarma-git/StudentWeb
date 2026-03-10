import React from 'react'
import "./Signup.css";
import img from "./signupgemi.png";

const Signup = () => {
  return (
    <div>
      <div className="login-container">
         <img src={img} className="login-image" />
      <form className="login-form">
         <input
          type="text"
          placeholder="Enter your Name"
          className="input"
        />

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

        <button className="login-btn">Signup</button>
      </form>

    </div>
    </div>
  )
}

export default Signup
