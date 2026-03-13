import React, { useState } from 'react'
import "./StudyPlan.css"
import img from "./studyplangemi2.png"
import { Link } from 'react-router-dom'

const StudyPlan = () => {

const [showModal,setShowModal]=useState(false)
const [task,settask]=useState("")
const [tasks,settasks]=useState([])

  return (
    <div id='main'>

      <div className="top">
        <h2>✏️ Study Plan</h2>
        <div className="topbtns">
        <button className="addBtn" style={{marginRight:"10px"}} onClick={()=>setShowModal(true)}>
          + Add Work
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
              <h3 className="title">{e}</h3>

              <div className="taskBtns">
                <button className="delete">Delete</button>
                <button className="edit">Edit</button>
              </div>

            </div>
          ))
        }
      </div>

      {showModal && (
        <div className="overlay">

          <div className="modal">

            <h3>Add Work</h3>

            <div className="inputfields">

              <input
                id='inputt'
                type='text'
                placeholder='Enter your task...'
                value={task}
                onChange={(e)=>settask(e.target.value)}
              />

              <div className="btns">

                <button
                className="addTask"
                onClick={()=>{

                  if(task.trim()==="") return

                  settasks([...tasks,task])
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