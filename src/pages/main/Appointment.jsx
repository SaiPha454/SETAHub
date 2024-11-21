import React, {useContext, useEffect, useState} from 'react'
import styles from "./Appointment.module.css"
import globalStyles from "../../styles/global.module.css"
import { useParams } from 'react-router-dom'
import backIcon from "../../assets/backicon.svg"
import { Link, useLocation } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import TimeSlot from '../../components/ui/TimeSlot'
import Button from "../../components/ui/Button"
import { formatDatefromCalendar } from '../../utils/calendar'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'

export default function Appointment() {

  const query = new URLSearchParams(useLocation().search);
  const taName = query.get("ta_name")
  const prev_url = query.get("from")
  const {topicId, taId} = useParams();
  const [date, setDate] = useState(new Date());
  const { authUser } = useContext(AuthContext)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [timeslots, setTimeSlots] = useState([])

  useEffect(()=>{

    const fetchAvailableTimeSlots = async () =>{
      
      try {
        let response = await axios.get(`http://localhost:8000/users/${taId}/available-timeslots?topic_id=${topicId}`, {withCredentials: true})
        setTimeSlots(response.data.data)
        
      } catch (error) {
        console.log("Error : ", error.response)
      }

    }

    fetchAvailableTimeSlots()
  }, [])

  console.log(authUser)
  useEffect(()=>console.log("Slots :",timeslots),[timeslots])

  const disableOtherMonthDays = ({ date, view }) => {
    if (view === 'month') { // Only for month view
      const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)
      const nextMonth = (currentMonth + 1) % 12; // Get the next month
      const currentYear = new Date().getFullYear(); // Get the current year
      const yearOfDate = date.getFullYear(); // Get the year of the date

      // Enable only dates from the current and next month
      if (yearOfDate === currentYear && (date.getMonth() === currentMonth || date.getMonth() === nextMonth)) {
        return false; // Allow the date to be selected
      } else if (yearOfDate === currentYear + 1 && nextMonth === 0 && date.getMonth() === 0) {
        return false; // Allow the date if next month is January of the next year
      }
      return true; // Disable the date otherwise
    }
    return false; // For other views (year, decade), don't disable anything
  };


  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatDatefromCalendar(date);
  
      // Check if there are timeslots and if any of them are selected
      if (timeslots[formattedDate] && timeslots[formattedDate].some(slot => slot.selected)) {
        return styles.highlightDateSelected; // Highlight with red if any slot is selected
      } else if (timeslots[formattedDate] && timeslots[formattedDate].length > 0) {
        return styles.highlightDate; // Highlight with a different color for dates with available slots
      }
    }
    return styles.calendarDate; // Default class for other dates
  };
  const onSelectTimeSlotHandler = (day, index)=>{


    const copyTimeSlots = {...timeslots}

    // copyTimeSlots[day][index].selected = !copyTimeSlots[day][index].selected

    for(let key in copyTimeSlots) {
        
      copyTimeSlots[key].forEach( (slot, i) => {
        if (key == day && i == index){
          slot.selected = true
          setSelectedDate(day)
          setSelectedTimeSlot(slot)
        }else{
          slot.selected = false
        }
      });
    }

    setTimeSlots(copyTimeSlots)
  }

  const onSelectDate= (e)=>{
    
    let formatedDate = formatDatefromCalendar(e)
    if (!timeslots[formatedDate]) {
      setTimeSlots({...timeslots, [formatedDate]: []})
    }
    setDate(e)
  }

  const onConfirmBooking = async () =>{

    try {

      let response = await axios.post("http://localhost:8000/bookings",{

        topic_id : topicId,
        student_id : authUser.id,
        ta_id: taId,
        date: selectedDate,
        timeslot: {from: selectedTimeSlot.from, to: selectedTimeSlot.to}

      }, {withCredentials: true})

      setSuccess(true)
      setErrorMessage(null)
      setTimeout(() => {
        setSuccess(false)
      }, 2000);

    } catch (error) {
      console.log(error.response.data)
      setErrorMessage(error.response.data.message)
    }

  }

  return (
    <div className={`${styles.appointment}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.header}`}>
          <Link to={prev_url} className={styles.backArrow}>
            <img src={backIcon} className={`${styles.icon}`} />
            <span>Make an appointment with {taName} </span>
          </Link>
          
        </div>
        <div className={`${styles.content}`}>
          <div>
            <Calendar 
              onChange={onSelectDate}
              value={date}
              tileDisabled={disableOtherMonthDays}
              maxDetail="month"
              showDoubleView={false}
              tileClassName={tileClassName}
            />
          </div>
          <div className={`${styles.timeSlot}`}>
            <h3>Time Slots for {date.toLocaleString('default',{month:'long',day:'2-digit'})} </h3>
            <div className={`${styles.timeSlotContent}`}>
              {
                timeslots[formatDatefromCalendar(date)] && 
                timeslots[formatDatefromCalendar(date)].map((tm, index)=>{
                  
                  return <TimeSlot 
                  selected={tm.selected} 
                  onSelect={()=>onSelectTimeSlotHandler(formatDatefromCalendar(date),index)} 
                  key={index} 
                  start={tm.from} end={tm.to} />
                })
              }
            </div>
            <Button onClick={onConfirmBooking} color='#FFA500' text='Confirm' />
            {success && <p className={`${styles.success}`} >Your booking is successful !</p>}
            { (errorMessage && !success) && <p className={`${styles.error}`} >{errorMessage}</p> }
          </div>
        </div>
      </div>
    </div>
  )
}
