import React, { useState } from 'react'
import "./StudyPlan.css"
import img from "./studyplangemi2.png"
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const StudyPlan = () => {

const [showModal,setShowModal]=useState(false)
const [showTopicModal,setShowTopicModal]=useState(false)
const [showTopic,setShowTopic]=useState(false)


const [topiclist,settopiclist]=useState([]);
const [topic,settopic]=useState("");
const [subId,setsubId]=useState(null);
const [subject,setsubject]=useState([]);
const [newSubject,setNewSubject] = useState("");




  async function getSubjects(){
     const token = localStorage.getItem("token");
     const API=await fetch("https://studentweb-nqae.onrender.com/allsubjects",{
        headers:{
          Authorization:`Bearer ${token}`
       }
});
      const data=await API.json();
      if(data.subjects){
        setsubject(data.subjects);
      }
  }
  getSubjects();


  async function getTopics(SubjId){
     const token = localStorage.getItem("token");
     const API=await fetch("https://studentweb-nqae.onrender.com/alltopics",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({subjectId:SubjId})
     });
     const data=await API.json();
     if(data.topics){
      settopiclist(data.topics);
     }
  }
async function addSubject(subject){
  const token=localStorage.getItem("token");
  const API=await fetch("https://studentweb-nqae.onrender.com/addsubject",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({subject})
  });
   setShowModal(false);
  getSubjects();
}


async function addTopics() {
  const token=localStorage.getItem("token");
  const API=await fetch("httphttps://studentweb-nqae.onrender.com/localhost:4000/subjecttopic",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({topic:topic,subjectId:subId})
  });
  await getTopics(subId);
  settopic("");
  setsubId(null);
  setShowTopicModal(false);
}

async function deleteSub(subId){
  const token=localStorage.getItem("token");
  const API=await  fetch("https://studentweb-nqae.onrender.com/deletesubject",{
    method:"DELETE",
     headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({subjectId:subId})
  });
  getSubjects();
}



  return (
    <div id='main'>
      <div className="top">
        <h2>✏️ Study Plan</h2>
        <div className="topbtns">
        <button className="addBtn" style={{marginRight:"10px"}} onClick={()=>setShowModal(true)}>
          + Add Subject
        </button>
        <Link to="/homee">
        <button className="addBtn">
          Back
        </button>
        </Link>
      </div>
      </div>

        <div className="mainContent">
        {
          subject.map((e,i)=>(
            <div className="content" key={e._id}>
              <h3 className="title">{e.subject}</h3>
                     
            <div className="taskBtns">
                <button className="delete" onClick={()=>{deleteSub(e._id)}}>Delete</button>
                <button className="edit" onClick={()=>{
                  setShowTopic(true)
                  getTopics(e._id)
                }}>CheckTopicList</button>
                <button className="edit" onClick={()=>{
                  setShowTopicModal(true)
                  setsubId(e._id)
                }}
                >Set Topics</button>
                <input type='checkbox' id='checkbox' />
              </div>
            </div>
          ))
        }
      </div>

      {showTopic && (
         <div className="overlay">
          <div className="modal">
            <h2 id='titleOfWinT'>Topics</h2>
         { topiclist.map((e,i)=>(
          <div className="eachtopic">
          <h4 key={e._id}>{e.topic}</h4>
           </div>
         ))}
          <button
                className="cancelTask"
                onClick={()=>setShowTopic(false)}
                >
                Cancel
                </button>
         
          </div>
 </div>

        
    )}

      {
        showTopicModal && (
          <div className="overlay">
          <div className="modal">
            <h2 id='titleOfWin'>Add Topic</h2>
            <div className="inputfields">
              
              <input
                id='inputt'
                type='text'
                value={topic}
                placeholder='Enter your Topic...'
                onChange={(e)=>settopic(e.target.value)}
              />
              <div className="btns">
                <button
                className="addTask"
                onClick={addTopics}
              >
                Add
                </button>

                <button
                className="cancelTask"
                onClick={()=>setShowTopicModal(false)}
                >
                Cancel
                </button>
              </div>
            </div>
          </div>
 </div>

         ) }
      

      {showModal && (
        <div className="overlay">
          <div className="modal">
            <h2 id='titleOfWin'>Add Subject</h2>
            <div className="inputfields">
              
              <input
                id='inputt'
                type='text'
                placeholder='Enter your Subject...'
                value={newSubject}
                onChange={(e)=>setNewSubject(e.target.value)}
              />

              <div className="btns">

                <button
                className="addTask"
                onClick={()=>{addSubject(newSubject)}}
                >
                Add
                </button>

                <button
                className="cancelTask"
                onClick={()=>setShowModal(false)}
                >
                Cancel
                </button>
              </div>
            </div>
          </div>
 </div>
      )}

       <div className="imgBox">
       { subject.length==0 && (
          <img src={img} className="img"/>
        )}
        </div> 

    </div>
  )
}


export default StudyPlan
