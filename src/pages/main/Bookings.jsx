import React, {useState} from 'react'
import styles from "./Bookings.module.css"
import SwitchTab from '../../components/SwitchTab'
import UpcomingBooking from '../../components/UpcomingBooking';
import CompletedBooking from '../../components/CompletedBooking'


export default function Booking() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.MyBookingsTitle}`}>My Bookings with TAs</h1>
      <div className={`${styles.switch}`}>
        <SwitchTab activeTab={activeTab} setActiveTab={setActiveTab}/>
      </div>
      <div className={`${styles.content}`}>
        {
          activeTab === "upcoming" ? <UpcomingBooking/> : <CompletedBooking />
        }
      </div>
    </div>
  )
}
