import React, {useState} from 'react'
import styles from "./Appointment.module.css"
import globalStyles from "../../styles/global.module.css"
import { useParams } from 'react-router-dom'
import backIcon from "../../assets/backicon.svg"
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import TimeSlot from '../../components/ui/TimeSlot'
import Button from "../../components/ui/Button"

export default function Appointment() {

    const {topicId, taId} = useParams();
    const [date, setDate] = useState(new Date());
    const [timeslots, setTimeSlots] = useState([
      {start:'09:00 AM',end:'12:30 PM', selected: true},
      {start:'09:00 AM',end:'12:30 PM', selected: false},
      {start:'09:00 AM',end:'12:30 PM', selected: true},
      {start:'09:00 AM',end:'12:30 PM', selected: false}
    ])

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

    const onSelectHandler = (index)=>{
      const newTimeSlots = timeslots.map((tm, i)=>{
        if(index == i) {
          tm.selected = !(tm.selected)
          return tm;
        }
        return tm;
      })
      setTimeSlots(newTimeSlots)
    }

  return (
    <div className={`${styles.appointment}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.header}`}>
          <Link to={`/me/topics/${topicId}/tas`}>
            <img src={backIcon} className={`${styles.icon}`} />
          </Link>
          <span>Make an appointment with {'Eaint Eaint Lyy'} </span>
        </div>
        <div className={`${styles.content}`}>
          <div>
            <Calendar 
              onChange={setDate}
              value={date}
              tileDisabled={disableOtherMonthDays}
              maxDetail="month"
              showDoubleView={false}
            />
          </div>
          <div className={`${styles.timeSlot}`}>
            <h3>Time Slots for {date.toLocaleString('default',{month:'long',day:'2-digit'})} </h3>
            <div className={`${styles.timeSlotContent}`}>
              {
                timeslots.map((tm, index)=>{
                  
                  return <TimeSlot 
                  selected={tm.selected} 
                  onSelect={()=>onSelectHandler(index)} 
                  key={index} 
                  start={tm.start} end={tm.end} />
                })
              }
            </div>
            <Button color='#FFA500' text='Confirm' />
          </div>
        </div>
      </div>
    </div>
  )
}
