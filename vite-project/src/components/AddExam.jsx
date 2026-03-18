import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img from "./AddExamGemi.png"
import "./AddExam.css"
const AddExam = () => {

  const [addExamModal,setaddExamModal]=useState(false);
  const [Subject,setSubject]=useState("");
  const [date,setdate]=useState("");
 
  const [backdata,setbackdata]=useState([]);



  async function SubmitRes(){

     if(!Subject || !date){
     alert("Please enter subject and date");
      return;
 }
    const token=localStorage.getItem("token");
    const API=await fetch("https://studentweb-nqae.onrender.com/examdate",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            subject:Subject,
            date:date           
        })
    })
    const data=await API.json();
    setSubject("");
 setdate("");
   GetAllDates();
}


  async function GetAllDates(){
     const token=localStorage.getItem("token");
    const API=await fetch("https://studentweb-nqae.onrender.com/allexam",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    });
    const data=await API.json();
   setbackdata(data.data);
  }

   useEffect(()=>{
   GetAllDates();
},[]);


   async function DeleteDate(Id){
    const token=localStorage.getItem("token");
    const API=await fetch("https://studentweb-nqae.onrender.com/deleteexamdate",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({examId:Id})
    }) ;
    GetAllDates()
   }
 

  return (
    <div>
        <div className="mainContainer">
            <div className="top">
        <h2>📝 Exam Day</h2>
        <div className="topbtns">
        <button className="addBtn" style={{marginRight:"10px"}}
        onClick={()=>setaddExamModal(true)}
        >
          + Add Exam
        </button>
        <Link to="/homee">
        <button className="addBtn">
          Back
        </button>
        </Link>
      </div>
      </div>

     {
        addExamModal && (
            <div className="mainFile">
            <div className="modal">
                <div className="title">Add Exam</div>
                <input type='text' placeholder='Enter Subject Name'id='subjectName'
                value={Subject}
                onChange={(e)=>setSubject(e.target.value)}
                />
                <input type='date' id='Inputdate' 
                value={date}
                onChange={(e)=>setdate(e.target.value)}/>
                <div className="btns">
                <button onClick={()=>{
                    setaddExamModal(false)
                    SubmitRes()}
                    } >Add Date</button>
                <button onClick={()=>setaddExamModal(false)}>Cancel</button>
                </div>
                </div>
            </div>
        )
     }

            <div className="twoboxes">
            <div className="contents">
                {backdata.map((e,i)=>(
                    <div className="boxes" key={i}>
                        <div className="title" style={{fontSize:"20px"}} >{e.subject}</div>
                        <div className="right">
                        <div className="dates">Exam Date {new Date(e.date).toLocaleDateString("en-GB")}</div>
                        <button onClick={()=>DeleteDate(e._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="photo">
        {
        <img src={img} style={{height:"400px",width:"300px"}}className='image' ></img>
}
            </div>
            </div>

        </div>
    </div>
  )
}

export default AddExam
