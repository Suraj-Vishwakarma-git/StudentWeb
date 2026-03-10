import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import Signup from "./components/Signup.jsx";
import "./App.css";

function App() {

  const { setUser } = useContext(UserContext);

  function logedin() {
    setUser("SURAJ");
  }

  return (
    <>
      <BrowserRouter>

        <Header />
        <Routes>
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