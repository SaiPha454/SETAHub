import React, {useEffect, useState} from 'react'
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


export default function Appointment() {

  const query = new URLSearchParams(useLocation().search);
  const taName = query.get("ta_name")
  const prev_url = query.get("from")
  const {topicId, taId} = useParams();
  const [date, setDate] = useState(new Date());
  const [timeslots, setTimeSlots] = useState({
    "2024-11-25":[
      {start:'09:00 AM',end:'12:30 PM', selected: true},
      {start:'09:00 AM',end:'12:30 PM', selected: false}
    ],
    "2024-11-29":[
      {start:'09:00 AM',end:'12:30 PM', selected: true},
      {start:'09:00 AM',end:'12:30 PM', selected: false}
    ],
    "2024-11-19":[
      {start:'09:00 AM',end:'12:30 PM', selected: true},
      {start:'09:00 AM',end:'12:30 PM', selected: false}
    ]
  })
  
  let temp = [
    {start:'09:00 AM',end:'12:30 PM', selected: true},
    {start:'09:00 AM',end:'12:30 PM', selected: false},
    {start:'09:00 AM',end:'12:30 PM', selected: true},
    {start:'09:00 AM',end:'12:30 PM', selected: false}
  ]
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


  // const tiltClass = ({ date, view }) => {
  //   // Only highlight dates in month view
  //   if (view === 'month') {
  //     const formattedDate = formatDatefromCalendar(date);
      
  //     if (timeslots[formattedDate] && timeslots[formattedDate].length > 0) {
        
  //       return styles.highlightDate; // Apply this class to highlighted dates
  //     }

  //   }
  //   return styles.calendarDate;
  // };
  const tiltClass = ({ date, view }) => {
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
    copyTimeSlots[day][index].selected = !copyTimeSlots[day][index].selected

    setTimeSlots(copyTimeSlots)
  }

  const onSelectDate= (e)=>{
    
    let formatedDate = formatDatefromCalendar(e)
    if (!timeslots[formatedDate]) {
      setTimeSlots({...timeslots, [formatedDate]: []})
    }
    setDate(e)
  }

  const onConfirmBooking = () =>{
    
    const selectedTimeSlots = {}
    for (let key in timeslots){
      let slots = timeslots[key].filter((slot)=>slot.selected)
      if (slots.length > 0){
        slots = slots.map((slot)=>{
          return {from: slot.start, to: slot.end}
        })
        selectedTimeSlots[key]=slots
      }
    }
    console.log("Confirm booking with Timeslots : ", selectedTimeSlots)
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
              tileClassName={tiltClass}
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
                  start={tm.start} end={tm.end} />
                })
              }
            </div>
            <Button onClick={onConfirmBooking} color='#FFA500' text='Confirm' />
          </div>
        </div>
      </div>
    </div>
  )
}
