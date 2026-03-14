import React, { useState } from 'react'
import "./StudyPlan.css"
import img from "./studyplangemi2.png"
import { Link } from 'react-router-dom'

const StudyPlan = () => {

const [showModal,setShowModal]=useState(false)
const [task,settask]=useState("")
const [tasks,settasks]=useState([])
const [topic,setTopic]=useState("")
const [showTopicModal,setShowTopicModal]=useState(false)
const [selectedIndex,setSelectedIndex]=useState(null)

  return (
    <div id='main'>
      <div className="top">
        <h2>✏️ Study Plan</h2>
        <div className="topbtns">
        <button className="addBtn" style={{marginRight:"10px"}} onClick={()=>setShowModal(true)}>
          + Add Subject
        </button>
        <Link to="/homee">
        <button className="addBtn" onClick={()=>setShowModal(true)}>
          Back
        </button>
        </Link>
      </div>
      </div>

        <div className="mainContent">
        {
          tasks.map((e,i)=>(
            <div className="content" key={i}>
              <h3 className="title">{e.Subject}</h3>
              <div className="maintopic">
              <p>Topic List</p>
              
              {
                e.topic.map((t,i)=>(
               <div className="topicsXX">
                  <h5>{t}</h5>
              </div> 
                ))
               
              }
              
              </div>
              <div className="taskBtns">
                <button className="delete">Delete</button>
                <button className="edit"
                onClick={()=>{
                  setSelectedIndex(i)
                  setShowTopicModal(true)}
                }
                >Set Topics</button>
                <input type='checkbox' id='checkbox' />
              </div>
            </div>
          ))
        }
      </div>

      {
        showTopicModal && (
          <div className="overlay">
          <div className="modal">
            <h2 id='titleOfWin'>Add Topics</h2>
            <div className="inputfields">
              
              <input
                id='inputt'
                type='text'
                placeholder='Enter your Topic...'
                value={topic}
                onChange={(e)=>setTopic(e.target.value)}
              />

              <div className="btns">

                <button
                className="addTask"
                onClick={()=>{

                  if(topic.trim()==="") return
                  const array=[...tasks]
                  array[selectedIndex].topic.push(topic);
                  settasks(array)
                  setSelectedIndex(null)
                  setTopic("")
                  settask("")
                  setShowTopicModal(false)
                }}>
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
                value={task}
                onChange={(e)=>settask(e.target.value)}
              />

              <div className="btns">

                <button
                className="addTask"
                onClick={()=>{

                  if(task.trim()==="") return

                  settasks([...tasks,{
                    Subject:task,
                    topic:[]
                  }])
                  settask("")
                  setShowModal(false)

                }}>
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
       {tasks.length === 0 && (
          <img src={img} className="img"/>
        )}
        </div> 

    </div>
  )
}

export default StudyPlan