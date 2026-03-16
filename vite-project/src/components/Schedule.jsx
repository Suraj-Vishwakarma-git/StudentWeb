import React, { useState ,useEffect} from 'react'
import "./Schedule.css"
import { Link } from 'react-router-dom';
const Schedule = () => {

    const [backdata,setbackdata]=useState([]);
    const [subjects,setsubject]=useState([]);
    const [topiclist,settopiclist]=useState([]);
    const [showTopicModal,setshowTopicModal]=useState(false);

     async function GetAllDates(){
        const token=localStorage.getItem("token");
       const API=await fetch("http://localhost:4000/allexam",{
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
      getSubjects();
   },[]);

    async function getSubjects(){
     const token = localStorage.getItem("token");
     const API=await fetch("http://localhost:4000/allsubjects",{
        headers:{
          Authorization:`Bearer ${token}`
       }
});
      const data=await API.json();
      if(data.subjects){
        setsubject(data.subjects);
      }
  }
  


  async function getTopics(SubjId){
     const token = localStorage.getItem("token");
     const API=await fetch("http://localhost:4000/alltopics",{
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


  return (
    <div>
    <div className="MainBox">
    <div className="headerr"><h2>Your Entire Schedule</h2></div>


    {showTopicModal && (
        <div className="topicContainer">
            <div className="mainTopicBox">
            {topiclist.length===0 ?(
                <div className="notopic">
                <h1>Topic List Is Empty</h1>
               <Link to="/studyplan"> <button>Click to Set Topics</button></Link>
                <button onClick={()=>setshowTopicModal(false)}>Cancel</button>
                </div>
            ):(
                <div className="topictrue">
                    <div className="title">Topics</div>
                  <div className="topics">
                    {topiclist.map((e)=>(
                        <p key={e._id}>{e.topic}</p>
                    ))}
                  </div>
                  <button onClick={()=>setshowTopicModal(false)}>Cancel</button>
                </div>
            )}
        </div>
        </div>
    )}
  


   
   <div className="twinBoxes">

    <div className="StudyDetails">
    <div className="titlee">✏️ Study Plan</div>
    <div className="data">

  {subjects.length===0 ? (

      <div className="Backbtn" style={{height:"200px",width:"100%",marginTop:"50px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"30px"}}>
      <h2>Please Add Study Plan</h2>
      <Link to="/studyplan"><button>Study Plan</button></Link>  
      </div>

      ) : (

      subjects.map((s)=>(
      <div key={s._id} className="subjectRow">
      <span className='subjectStudyPlan'>{s.subject}</span>
      <button onClick={()=>{
      getTopics(s._id)
      setshowTopicModal(true)
      }}>
      Topics
      </button>

</div>
))
)}

  </div>
    </div>
    <div className="ExamDetails"> 
    <div className="titlee">📝 Exam Day</div>
    <div className="data">
   {backdata.length===0 ? (
    <div className="Backbtn">
    <h2>Please Add Exam Dates</h2>
    <Link to="/addexam"><button>Exam Dates</button></Link>
    </div>

) : (
       backdata.map((e)=>{
       const diff = new Date(e.date) - new Date();
      const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
       let status;
       if(daysLeft > 0){
          status = `${daysLeft}  days left`;
       }
       else if(daysLeft === 0){
         status = "Exam Today";
       }
       else{
         status = "Completed";
       }
       return(
       <div key={e._id} className="examRow">
       <span className='statusExam'>{e.subject}</span>
       <span style={{color: daysLeft <= 1? "red" :( (daysLeft>=2 && daysLeft<=4) ? "orange" :  "green")}} className='statusExam'>
       {status}
       </span>       
       </div>
)

})

)}
    
  </div>
        
    </div>
   </div>


</div>
    </div>
  )
}

export default Schedule
