import React, {useState} from 'react'
import styles from "./CompletedTASession.module.css"
import Appointment from './ui/Appointment'

export default function CompletedTASession() {
    let sessionList = [
        {
            img:"https://www.svgrepo.com/show/452234/java.svg",
            title:"Dta Structure and Alogorithms",
            date : "12/2/2024",
            startTime : "09:30 AM",
            endTime : "12:30 PM",
            mentor:{
                name:"Sai Marn Pha",
                id: "66011533",
                profile: "https://i.pinimg.com/550x/8d/52/c5/8d52c5c35382908832ffedb21c1e63b0.jpg",
                year : 2
            }
        },
        {
            img:"https://www.svgrepo.com/show/452234/java.svg",
            title:"Computer Architecure and Organization ( CAO )",
            date : "12/2/2024",
            startTime : "09:30 AM",
            endTime : "12:30 PM",
            mentor:{
                name:"Phoo Pwint Cho thar",
                id: "66011533",
                profile: "https://i.pinimg.com/550x/8d/52/c5/8d52c5c35382908832ffedb21c1e63b0.jpg",
                year : 2
            }
        },
        {
            img:"https://www.svgrepo.com/show/452234/java.svg",
            title:"Dta Structure and Alogorithms",
            date : "12/2/2024",
            startTime : "09:30 AM",
            endTime : "12:30 PM",
            mentor:{
                name:"Yanin sae Ma",
                id: "66011533",
                profile: "https://i.pinimg.com/550x/8d/52/c5/8d52c5c35382908832ffedb21c1e63b0.jpg",
                year : 2
            }
        },
        {
            img:"https://www.svgrepo.com/show/452234/java.svg",
            title:"Dta Structure and Alogorithms",
            dateTime : "12/2/2024",
            startTime : "09:30 AM",
            endTime : "12:30 PM",
            mentor:{
                name:"Eaint Eaint Lyy",
                id: "66011533",
                profile: "https://i.pinimg.com/550x/8d/52/c5/8d52c5c35382908832ffedb21c1e63b0.jpg",
                year : 2
            }
        }
    ]
    const [bookings, setBookings] = useState(sessionList)

    return(
     <div className={`${styles.container}`}>
        <div className={`${styles.content}`}>
          {
              bookings.map((booking, index) =>{
                  return <Appointment key={`${booking.title}${index}`}
                  date={booking.date}
                  startTime={booking.startTime}
                  endTime={booking.endTime}
                  img={booking.img}
                  studentId={booking.mentor.id}
                  year={booking.mentor.year}
                  name={booking.mentor.name}
                  title={booking.title} >
                      
                      <div className={`${styles.completed}`}>Completed</div>
                  </Appointment>
              })
          }
        </div>
      </div>
    )
}
