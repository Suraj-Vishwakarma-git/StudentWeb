import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import StudyPlan from "./components/StudyPlan.jsx";
import AddExam from "./components/AddExam.jsx";
import FocusMode from "./components/FocusMode.jsx";
import Calender from "./components/Calendar.jsx";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import Signup from "./components/Signup.jsx";
import "./App.css";

function App() {

  const { setUser } = useContext(UserContext);
 
  return (
    <>
      <BrowserRouter>

        <Header />
        <Routes>
          <Route path="/addexam" element={<AddExam/>}/>
          <Route path="/calendar" element={<Calender/>}/>
          <Route path="/studyplan" element={<StudyPlan/>}/>
          <Route path="/focusmode" element={<FocusMode/>}/>
          <Route path="/homee" element={<Main/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;