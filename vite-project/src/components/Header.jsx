import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";



const Header = () => {

 const [clicked,setcliked]=useState(false);

 function hamburger(){
  setcliked(!clicked);
 }

  return (
    <header className="header">

      <Link to="/" className="logo">
        <span>STUDY</span>
        <span className="logo-red">OS</span>
      </Link>

      <nav className={clicked?"nav":"nav-links"} >
        <Link to="/schedule" onClick={()=>setcliked(false)}>Schedule</Link>
        <Link to="/calendar" onClick={()=>setcliked(false)}>Calendar</Link>
        <Link to="/login" onClick={()=>setcliked(false)}>Login</Link>
      </nav>

      <div className="hamburger" onClick={hamburger}>
        ☰
      </div>

    </header>
  );
};

export default Header;