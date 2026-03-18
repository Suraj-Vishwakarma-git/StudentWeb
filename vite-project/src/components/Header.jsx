import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { jwtDecode } from "jwt-decode";
import "./Common.css";


const Header = () => {

 const [clicked,setcliked]=useState(false);
 const [userName, setUserName] = useState("");
 const [logoutModal,setLogoutModal]=useState(false);
  

 function hamburger(){
  setcliked(!clicked);
 }

  function logout(){
    const token = localStorage.removeItem("token");
    setUserName("");
    window.location.reload();
  }

  useEffect(()=>{
    loadUser()
    window.addEventListener("userChanged", loadUser);
    
  return () => {
    window.removeEventListener("userChanged", loadUser);
  };
  },[])

    function loadUser(){
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const decoded = jwtDecode(token);
        setUserName(decoded.name);
      }
    } catch (e) {
      console.log(e);
    }
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
        {userName!=="" ?(
        <div className="logedInBox" onClick={()=>{setLogoutModal(true),setcliked(false)}}>⚪{userName}</div>
           
        ):(<Link to="/login" onClick={()=>setcliked(false)}>Login</Link>)}
      </nav>

      <div className="hamburger" onClick={hamburger}>
        ☰
      </div>

      {logoutModal && (
        <div className="logOUT">
        <div className="logoutBox">
          <div className="img">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="dp" id="img" />
          </div>

          <div className="textttt">
            <span>Hello</span>
          <div className="name">{userName}</div>
          </div>
          <div className="btns">
            <button onClick={()=>setLogoutModal(false)} className="b1">Cancel</button>
            <button className="b2" onClick={()=>{logout(),setLogoutModal(false)}}>LogOut</button>
          </div>
        </div>
        </div>
      )}

    </header>
  );
};

export default Header;