import React, { useEffect, useState } from 'react'
import "./Main.css"
import { Link } from 'react-router-dom';
const Main = () => {

  const [quotes,setquotes]=useState("");
  const [timeLeft,setTimeLeft]=useState("");
  useEffect(()=>{
    function updateTime(){
      const now=new Date();
      const tomorrow=new Date();
      tomorrow.setHours(24,0,0,0);
      const diff=tomorrow-now;
      const hours=Math.floor(diff/(1000*60*60));
      const minute=Math.floor((diff/(1000*60))%60);
      const seconds=Math.floor((diff/1000)%60);
      setTimeLeft(`${hours}h ${minute}m ${seconds}s`);
    }
    
    updateTime();
    const timer=setInterval(updateTime,1000);
    return ()=> clearInterval(timer);
  },[]);

  async function quotess(){
   const API=await fetch("https://dummyjson.com/quotes/random");
   const data=await API.json();
   console.log(data.quote);
   setquotes(data.quote);
  }
  useEffect(()=>{
    quotess();
  },[]);

  return (
    <div className='main'>
      
   <div className="progressCard">
     <div className="Mblock">
    <div className="block">
    <div className="textt">
    <div className="gemilogo">✨</div>
    <h2>Daily Progress</h2>
    </div>
     <div className="qoutes">{quotes}</div>
    </div>
  <div className="progressPercent">0%</div>

    </div>

    <div className="dateTime">⏳ Time left today: {timeLeft}</div>

   
    </div>

   <div className="quickActions">
    <h2 id='quickmeg'>Quick Actions</h2>
    <div className="quickGrid">

    <Link to="/focusmode">
    <div className="quickBox">
    <span className="icon">🎯</span>Focus Mode</div>
    </Link>

     <Link to="/studyplan">
    <div className="quickBox">
    <span className="icon">📚</span>Study Plan</div>
    </Link>
   
   <Link to="/addexam" className="quickBox" id='lastBox'>
    <div>
    <span className="icon">📅</span>
    Add Exam</div>
    </Link>
</div>

    </div>
   
    </div>
  )
}

export default Main
