import React, {useState, useEffect, useContext} from 'react'
import styles from "./CompletedBooking.module.css"
import Appointment from './ui/Appointment'
import MessageButton from "./ui/LinkButton"
import CancelButton from "./ui/Button"
import axios from 'axios'   
import { AuthContext } from '../AuthContext'
import { isFilePath } from '../utils/isFilePath'
import defaultTopicIcon from "../assets/general.png"

export default function CompletedBooking() {

    const [bookings, setBookings] = useState([])
    const { authUser } = useContext(AuthContext)
    

    useEffect(()=>{
        const fetchCompletedBooking = async () => {
            try {
                let response = await axios.get(`http://localhost:8000/users/${authUser.id}/completed-bookings`,{withCredentials: true})
                setBookings(response.data.data)
                
            }catch (error) {
                
            }
        }

        fetchCompletedBooking()
    }, [])
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.content}`}>
        {
            bookings.map((booking, index) =>{
                return <Appointment key={`${booking.topic.topic}${index}`}
                date={booking.date}
                startTime={booking.timeslot.from}
                endTime={booking.timeslot.to}
                img={isFilePath(booking.topic.img) ? `http://localhost:8000${booking.topic.img}` : defaultTopicIcon}
                studentId={booking.ta.id}
                year={booking.ta.year}
                name={booking.ta.name}
                title={booking.topic.topic} >
                    
                    <div className={`${styles.completed}`}>Completed</div>
                </Appointment>
            })
        }
      </div>
    </div>
  )
}
