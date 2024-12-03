import React, {useState, useEffect, useContext} from 'react'
import styles from "./CompletedTASession.module.css"
import Appointment from './ui/Appointment'
import axios from 'axios'
import { AuthContext } from '../AuthContext'
import { isFilePath } from '../utils/isFilePath'
import defaultTopicIcon from "../assets/general.png"


export default function CompletedTASession() {

    const [bookings, setBookings] = useState([])
    const { authUser } = useContext(AuthContext)

    useEffect(()=>{
        const fetchCompletedTASession = async () => {
            try {
                let response = await axios.get(`http://localhost:8000/users/${authUser.id}/completed-appointments`, {withCredentials: true})
                setBookings(response.data.data)
            } catch (error) {
                
            }
        }

        fetchCompletedTASession()
    },[])
    return(
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
                  peer_id={booking.student.id}
                  topic_id={booking.topic_id}
                  title={booking.topic.topic} >
                      
                      <div className={`${styles.completed}`}>Completed</div>
                  </Appointment>
              })
          }
        </div>
      </div>
    )
}
