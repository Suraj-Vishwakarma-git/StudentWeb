import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import StudyPlan from "./components/StudyPlan.jsx";
import Schedule from "./components/Schedule.jsx";
import AddExam from "./components/AddExam.jsx";
import FocusMode from "./components/FocusMode.jsx";
import Calender from "./components/Calendar.jsx";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import Signup from "./components/Signup.jsx";
import "./App.css";
import { useState,useEffect } from "react";

function App() {

  const [UserLogIn,setUserLogIn]=useState(false);
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    setUserLogIn(true);
  }
}, []);
 
  return (
    <>
      <BrowserRouter>

<Header loginUser={UserLogIn} setloginUser={setUserLogIn} />        <Routes>
          <Route path="/schedule" element={<Schedule loginUser={UserLogIn} />}  />
          <Route path="/addexam" element={<AddExam/>}/>
          <Route path="/calendar" element={<Calender loginUser={UserLogIn} />}   />
          <Route path="/studyplan" element={<StudyPlan/>}/>
          <Route path="/focusmode" element={<FocusMode/>}/>
          <Route path="/homee" element={<Main loginUser={UserLogIn} />}  />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login setloginUser={setUserLogIn} />}  />
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;