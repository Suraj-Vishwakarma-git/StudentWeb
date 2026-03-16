import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [examDays, setExamDays] = useState([]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January","February","March","April",
        "May","June","July","August",
        "September","October","November","December"
    ];

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const changeMonth = (value) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + value);
        setCurrentDate(newDate);
    };

    const toggleExam = (day) => {
        const key = `${year}-${month}-${day}`;

        if (examDays.includes(key)) {
            setExamDays(examDays.filter(d => d !== key));
        } else {
            setExamDays([...examDays, key]);
        }
    };

    const dates = [];

    for (let i = 0; i < firstDay; i++) {
        dates.push(null);
    }

    for (let d = 1; d <= lastDate; d++) {
        dates.push(d);
    }

    return (
        <div className="calendarContainer">

            <div className="calendarHeader">
                <button onClick={() => changeMonth(-1)}>◀</button>
                <h2>{monthNames[month]} {year}</h2>
                <button onClick={() => changeMonth(1)}>▶</button>
            </div>

            <div className="calendarGrid">

                {days.map((day) => (
                    <div className="dayName" key={day}>{day}</div>
                ))}

                {dates.map((day, index) => {

                    const key = `${year}-${month}-${day}`;
                    const isExam = examDays.includes(key);

                    return (
                        <div
                            key={index}
                            className={`date ${isExam ? "exam" : ""}`}
                            onClick={() => day && toggleExam(day)}
                        >
                            {day}
                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default Calendar;