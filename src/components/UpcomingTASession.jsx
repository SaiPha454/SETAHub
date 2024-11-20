import React, {useState, useContext, useEffect} from 'react'
import styles from "./UpcomingTASession.module.css"
import Appointment from './ui/Appointment'
import MessageButton from "./ui/LinkButton"
import CancelButton from "./ui/Button"
import axios from 'axios'
import { AuthContext } from '../AuthContext'
import { isFilePath } from "../utils/isFilePath"
import defaultTopicIcon from "../assets/general.png"

export default function UpcomingTASession() {

    const [bookings, setBookings] = useState([])
    const { authUser } = useContext(AuthContext)

    useEffect(()=>{
        const fetchUpcomingTASession = async () => {
            
            try {
                let response = await axios.get(`http://localhost:8000/users/${authUser.id}/upcoming-appointments`, {withCredentials: true})
                setBookings(response.data.data)
            } catch (error) {
                
            }
        }
        fetchUpcomingTASession()
    },[])
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.content}`}>
        {
            bookings.map((booking, index) =>{
                return <Appointment key={`${booking.id}${index}`}
                date={booking.date}
                startTime={booking.timeslot.from}
                endTime={booking.timeslot.to}
                img={isFilePath(booking.topic.img) ? `http://localhost:8000${booking.topic.img}` : defaultTopicIcon}
                studentId={booking.student.id}
                year={booking.student.year}
                name={booking.student.name}
                title={booking.topic.topic} >
                    <CancelButton text="cancel" color='#E33B3B' />
                    <MessageButton text="Message" url={`/me/chat/${booking.student.id}?peer_name=${booking.student.name}`} />
                </Appointment>
            })
        }
      </div>
    </div>
  )
}
