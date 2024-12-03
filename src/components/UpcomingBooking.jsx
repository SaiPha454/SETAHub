import React, {useState, useEffect, useContext} from 'react'
import styles from "./UpcomingBooking.module.css"
import Appointment from './ui/Appointment'
import MessageButton from "./ui/LinkButton"
import CancelButton from "./ui/Button"
import axios from 'axios'
import { AuthContext } from '../AuthContext'
import defaultTopicIcon from "../assets/general.png"
import { isFilePath } from '../utils/isFilePath'

export default function UpcomingBooking() {

    const { authUser } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const [refresh ,setRefresh] = useState(false)
    useEffect(()=>{

        const fetchUpcomingBookings = async () =>{
            console.log("AUth user In upcoming booking : ", authUser.data)
            try {
                
                let response = await axios.get(`http://localhost:8000/users/${authUser.id}/upcoming-bookings`, {withCredentials: true})
                setBookings(response.data.data)
            } catch (error) {
                
            }
        }

        fetchUpcomingBookings()
    }, [refresh])

  const onCancelBooking = async (id) =>{
    try {
      let response = await axios.delete(`http://localhost:8000/bookings/${id}`, {withCredentials: true})
      setRefresh(!refresh)
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.content}`}>
        {
            bookings.map((booking, index) =>{
                console.log(booking)
                return <Appointment key={`${booking.topic.topic}${index}`}
                date={booking.date}
                startTime={booking.timeslot.from}
                endTime={booking.timeslot.to}
                img={ isFilePath(booking.topic.img) ? `http://localhost:8000${booking.topic.img}` : defaultTopicIcon}
                studentId={booking.ta.student_id}
                year={booking.ta.year}
                name={booking.ta.name}
                title={booking.topic.topic}
                classes={styles.annimated}
                peer_id={booking.ta.id}
                topic_id = {booking.topic_id}
                >
                    <CancelButton text="cancel" color='#E33B3B' onClick={()=>onCancelBooking(booking.id)}  />
                    <MessageButton text="Message" url={`/me/chat/${booking.ta.id}?peer_name=${booking.ta.name}&topic_id=${booking.topic_id}`} />

                </Appointment>
            })
        }
      </div>
    </div>
  )
}
