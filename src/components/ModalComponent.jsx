import React, { useState, useContext } from "react";
import styles from "./ModalComponent.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // default styling
import TimeInput from '../components/ui/TimeInput'
import TATimeSlot from '../components/ui/TATimeSlot'
import Button from "../components/ui/Button"
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useEffect } from "react";


function ModalComponent({closeModal, courseId, topicId, taId}) {
    const [date, setDate] = useState(new Date());
    // Time Slot Choosing
    const [slots, setSlots] = useState({});
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [startPeriod, setStartPeriod] = useState('AM');

    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');
    const [endPeriod, setEndPeriod] = useState('AM');

    const[error, setError] = useState('');
    const { authUser } = useContext(AuthContext)
    const [success, setSuccess] = useState(false)
    const [confirmError, setConfirmError] = useState(null)

    useEffect(()=>{
        const fetchAvailableTimeSlots = async () =>{
            try {
                let response = await axios.get(`http://localhost:8000/users/${taId}/available-timeslots?topic_id=${topicId}`,{withCredentials: true})
                let data = response.data.data
                for (let key in data){
                    data[key] = data[key].map((slot)=>{
                        return {
                            start: slot.from,
                            end: slot.to
                        }
                    })
                }
                setSlots(data)
            } catch (error) {
                
            }
        }

        fetchAvailableTimeSlots()
    },[])

    const disableOtherMonthDays = ({ date, view }) => {
        if (view === "month") {
            const today = new Date();
            // Reset time to 12:00 AM for both dates to compare only the calendar day
            const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const dateToCheck = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
            if (dateToCheck < todayDateOnly) {
                return true; // Disable past dates
            }
    
            // Restrict to current and next month
            const currentMonth = today.getMonth();
            const nextMonth = (currentMonth + 1) % 12;
            const currentYear = today.getFullYear();
    
            if (
                date.getFullYear() === currentYear &&
                (date.getMonth() === currentMonth || date.getMonth() === nextMonth)
            ) {
                return false; // Allow dates in the current and next month
            } else if (
                date.getFullYear() === currentYear + 1 &&
                nextMonth === 0 &&
                date.getMonth() === 0
            ) {
                return false; // Allow January of the next year if current month is December
            }
    
            return true; // Disable all other dates
        }
        return false; // For other views (year, decade), don't disable anything
    };
        
    const addTimeSlot = () => {        
        if (startHour && startMinute && startPeriod && endHour && endMinute && endPeriod) {
            if (!isValidTime()) return;

            const startTime = `${startHour.padStart(2, "0")}:${startMinute.padStart(2, "0")} ${startPeriod}`;
            const endTime = `${endHour.padStart(2, "0")}:${endMinute.padStart(2, "0")} ${endPeriod}`;

            //selected date
            console.log(date)
            const dayofMonth = date.getDate();
            const month = date.getMonth()
            const fullYear = date.getFullYear()
            const formatedDate = `${fullYear}-${month}-${dayofMonth}`
            
            setSlots(prevDaySlots => {
                const currentDaySlots = prevDaySlots[formatedDate] || [];
                return {
                    ...prevDaySlots,
                    [formatedDate]: [...currentDaySlots, {start: startTime, end: endTime}]
                }
            })


            // Reset fields
            setStartHour("");
            setStartMinute("");
            setStartPeriod("AM");
            setEndHour("");
            setEndMinute("");
            setEndPeriod("AM");
        } else {
            setError('Please fill in all time fields');       
        }
    };

    const removeTimeSlot = (date, slotIndex) => {

        const dayofMonth = date.getDate();
        const month = date.getMonth()
        const fullYear = date.getFullYear()
        const formatedDate = `${fullYear}-${month}-${dayofMonth}`


        setSlots(prevDaySlots => {
            const updatedSlots = [...prevDaySlots[formatedDate]];
            updatedSlots.splice(slotIndex,1)

            //if no slot left for this data, remove the date key
            if (updatedSlots.length === 0) {
                const {[formatedDate] : _,...rest} = prevDaySlots;
                return rest;
            }

            return {...prevDaySlots, [formatedDate]:updatedSlots}
        })
    }

    const handleConfrim =async () => {

        let timeslots = {}
        for (let key in slots) {
            timeslots[key] = slots[key].map((slot)=>{
                return ({
                    "from": slot.start,
                    "to": slot.end
                })
            })
        }

        try {
            let dates = Object.keys(timeslots)
            let response = await axios.put(`http://localhost:8000/appointments/${courseId}`,{
                date : dates,
                timeslots: timeslots
            }, {withCredentials: true})
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 2000);
        } catch (error) {
            console.log(error.response)
            setConfirmError(error.response.data.message)
        }
        console.log("Data to be sent to database", slots);
    }

    //Time Validation Parts
    const convertTimeToMinutes = (hour, minute, period) => {
        let hours = parseInt(hour);
        const minutes=parseInt(minute)

        if (period == 'PM' && hours!== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }

        return hours*60 + minutes;
    }

    const isValidTime = () => {
        if (!startHour || !startMinute || !endHour || !endMinute) {
            setError("Please fill in all time fields");
            return false;
        }

        const startInMinutes = convertTimeToMinutes(startHour, startMinute, startPeriod);
        const endInMinutes = convertTimeToMinutes(endHour, endMinute, endPeriod);

        // Check if end time is before start time
        if (endInMinutes <= startInMinutes) {
            setError('End time must be after start time');
            return false;
        }

        const daySlots = slots[date.getDate()] || [];
        const hasOverlap = daySlots.some(slot => {
            const existingStart = convertTimeToMinutes(
                slot.start.split(':')[0],    //hour
                slot.start.split(':')[1].split(' ')[0],    //min
                slot.start.split(' ')[1]    //period
            );

            const existingEnd = convertTimeToMinutes(
                slot.end.split(':')[0],
                slot.end.split(':')[1].split(' ')[0],
                slot.end.split(' ')[1]
            );

            return (startInMinutes < existingEnd && endInMinutes > existingStart);
        })

        if (hasOverlap) {
            setError('Time slot overlaps with existing slot');
            return false;
        }

        setError('');
        return true;
        
    }
    

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
          const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      
          // Check if there are timeslots and if any of them are selected
          if (slots[formattedDate] && slots[formattedDate].length > 0) {
            return styles.highlightDate; // Highlight with a different color for dates with available slots
          }
        }
        return styles.calendarDate; // Default class for other dates
      };

    return (
        <div className={`${styles.calendarWrapper}`}>
            <div>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileDisabled={disableOtherMonthDays}
                    maxDetail="month"
                    showDoubleView={false}
                    className={`${styles.customCalendar}`}
                    tileClassName={tileClassName}
                />
            </div>
            <div className={`${styles.timeSlot}`}>
                <h3 className={`${styles.timeTitle}`}>
                    Choose Time Slots for {" "}
                    {date.toLocaleString("default", {
                        month: "long",
                        day: "2-digit",
                    })}{" "}
                </h3>
                <div className={`${styles.TimeBox}`}>
                    <div className={`${styles.startBox}`}>
                        <TimeInput
                            hour={startHour}
                            minute={startMinute}
                            period={startPeriod}
                            setHour={setStartHour}
                            setMinute={setStartMinute}
                            setPeriod={setStartPeriod}
                        />
                    </div>

                    <div className={`${styles.endBox}`}>
                        <TimeInput
                            hour={endHour}
                            minute={endMinute}
                            period={endPeriod}
                            setHour={setEndHour}
                            setMinute={setEndMinute}
                            setPeriod={setEndPeriod}
                        />
                    </div>
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <button onClick={addTimeSlot} className={styles.addBtn}>
                    Add +
                </button>
                { success && <p className={styles.successMessage} > Your Available Timeslots Updated Successfully!</p>}
                { (confirmError && !success) && <p className={styles.errorMessage} >{confirmError}</p>}
            </div>
            <div className={styles.slotContainer}>
            {slots[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`]?.map((slot, index) => (
                <TATimeSlot
                    key={index}
                    start={slot.start}
                    end={slot.end}
                    onRemove={() => removeTimeSlot(date, index)}
                />
            ))}

            </div>
            <div className={`${styles.btnWrapper}`}>
                <button  className={`${styles.cancleBtn}`} onClick={closeModal}>Cancle</button>
                <button  className={`${styles.confirmBtn}`} onClick={handleConfrim}>Confirm</button>
            </div>
        </div>
    );
}

export default ModalComponent;
