import React, { useEffect, useState } from "react";
import "./FocusMode.css";
import img from "./focusgemi.png";
import { Link } from "react-router-dom";
const FocusMode = () => {

const [timer,setTime] = useState(1500);
const [running,setRunning] = useState(false);



useEffect(() => {

let interval;

if(running && timer > 0){
    interval = setInterval(()=>{
        setTime(prev => prev - 1);
    },1000);
}

return () => clearInterval(interval);

},[timer,running]);

const minutes = Math.floor(timer/60);
const seconds = timer % 60;

function increaseTime(){
    setTime(timer + 300);
}

function decreaseTime(){
    if(timer > 300){
        setTime(timer - 300);
    }
}

function toggletimer(){
    setRunning(!running);
}



    function reset(){
        setRunning(false);
        setTime(1500);
    }


return (

<div id="focus-container">

<img  src={img} id="image" />

<div className="box">

<h1 className="title">Focus Mode</h1>

<div className="timer">

<h1 className="time">
{minutes}:{seconds < 10 ? "0":""}{seconds}
</h1>

<button className="startBtn" onClick={toggletimer}>
{running ? "Pause" : "Start"}
</button>

</div>

<div className="controls">

<button onClick={increaseTime}>+5 Min</button>
<button id="reset" onClick={reset}>⟳</button>
<button onClick={decreaseTime}>-5 Min</button>

</div>
 <Link to="/homee"><button id="backbutton">Back</button></Link> 
</div>

</div>

)

}

export default FocusMode