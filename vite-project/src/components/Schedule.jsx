import React, { useState, useEffect } from "react";
import "./Schedule.css";
import { Link } from "react-router-dom";

const Schedule = () => {

  const [backdata, setbackdata] = useState([]);
  const [subjects, setsubject] = useState([]);
  const [topiclist, settopiclist] = useState([]);
  const [showTopicModal, setshowTopicModal] = useState(false);

  async function GetAllDates() {

    const token = localStorage.getItem("token");

    const API = await fetch("http://localhost:4000/allexam", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const data = await API.json();
    setbackdata(data.data);

  }

  async function getSubjects() {

    const token = localStorage.getItem("token");

    const API = await fetch("http://localhost:4000/allsubjects", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await API.json();

    if (data.subjects) {
      setsubject(data.subjects);
    }

  }

  async function getTopics(SubjId) {

    settopiclist([]);

    const token = localStorage.getItem("token");

    const API = await fetch("http://localhost:4000/alltopics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subjectId: SubjId })
    });

    const data = await API.json();

    if (data.topics) {
      settopiclist(data.topics);
    }

  }

  async function Completed(Id){
    const token=localStorage.getItem("token");
    const API=await fetch("http://localhost:4000/completedSubject",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({subId:Id})
    });
   setsubject(prev =>
  prev.map(s =>
    s._id === Id ? { ...s, completed: true } : s
  )
);
  }

  useEffect(() => {
    Promise.all([GetAllDates(), getSubjects()]);
  }, []);

  const sortedExams = [...backdata].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const today = new Date();

  return (

    <div>

      <div className="MainBox">

        <div className="headerr">
          <h2>Your Entire Schedule</h2>
        </div>


        {showTopicModal && (

          <div className="topicContainer">

            <div className="mainTopicBox">

              {topiclist.length === 0 ? (

                <div className="notopic">

                  <h2>Topic List Is Empty</h2>

                  <Link to="/studyplan">
                    <button className="backBTN">Click to Set Topics</button>
                  </Link>

                  <button
                    onClick={() => setshowTopicModal(false)}
                    className="CancelBtn"
                  >
                    Cancel
                  </button>

                </div>

              ) : (

                <div className="topictrue">

                  <div className="title">Topics</div>

                  <div className="topics">
                    {topiclist.map((e) => (
                      <p key={e._id}>{e.topic}</p>
                    ))}
                  </div>
                  <button
                    onClick={() => setshowTopicModal(false)}
                    className="CancelBtn"
                  >
                    Cancel
                  </button>

                </div>

              )}

            </div>

          </div>

        )}


        <div className="twinBoxes">


          <div className="StudyDetails">

            <div className="titlee">✏️ Study Plan</div>
            <div className="data">
              {subjects.length === 0 ? (
                <div className="Backbtn">
                  <h2>Please Add Study Plan</h2>
                  <Link to="/studyplan">
                    <button>Study Plan</button>
                  </Link>

                </div>

              ) : (

                subjects.map((s) => (

                  <div key={s._id} className="subjectRow">

                    <span className="subjectStudyPlan">
                      {s.subject}
                    </span>
                    <div className="btnss">
                    <button
                      onClick={() => {
                        setshowTopicModal(true);
                        getTopics(s._id);
                      }}
                    >
                      Topics
                    </button>
                    <button 
                    disabled={s.completed}
                    onClick={()=>Completed(s._id)}
                    style={{background:s.completed?"gray":"green",
                        color:"white"
                    }}
                    >{s.completed?"Completed":"complete"}</button>
                   </div>
                  </div>

                ))

              )}

            </div>

          </div>


          <div className="ExamDetails">

            <div className="titlee">📝 Exam Day</div>

            <div className="data">

              {sortedExams.length === 0 ? (

                <div className="Backbtn">

                  <h2>Please Add Exam Dates</h2>

                  <Link to="/addexam">
                    <button>Exam Dates</button>
                  </Link>

                </div>

              ) : (

                sortedExams.map((e) => {

                  const diff = new Date(e.date) - today;
                  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

                  let status;

                  if (daysLeft > 0) {
                    status = `${daysLeft} days left`;
                  }
                  else if (daysLeft === 0) {
                    status = "Exam Today";
                  }
                  else {
                    status = "Completed";
                  }

                  return (

                    <div key={e._id} className="examRow">

                      <span className="statusExam">
                        {e.subject}
                      </span>

                      <span
                        className="statusExam"
                        style={{
                          color:
                            daysLeft <= 1
                              ? "red"
                              : daysLeft <= 4
                              ? "orange"
                              : "green"
                        }}
                      >
                        {status}
                      </span>

                    </div>

                  );

                })

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Schedule;