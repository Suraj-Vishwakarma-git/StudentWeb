import React from "react";
import img from "./img.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">

      <img src={img} alt="study illustration" className="home-image" />

      <h1 className="typing-text">
        
         Whats Your plan for today?
      </h1>

    </div>
  );
};

export default Home;