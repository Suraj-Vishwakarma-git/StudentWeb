import React from "react";
import img from "./img.png";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">

      <img src={img} alt="study illustration" className="home-image" />

      <h1 className="typing-text">
        
         Whats Your plan for today?
      </h1>
     <div id="button"><h2><Link to="/homee"> Start Preparation</Link></h2> </div>
    </div>
  );
};

export default Home;