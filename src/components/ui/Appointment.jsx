import React from 'react'
import styles from "./Appointment.module.css"
import TAProfile from "./LinkProfile"
import { Link } from 'react-router-dom'

function Appointment({img, title, name, studentId, year, date, startTime, endTime, children, classes,peer_id, topic_id}) {
  return (
    <Link className={`${styles.appointment} ${classes}`} to={`/me/chat/${peer_id}?peer_name=${name}&topic_id=${topic_id}`}>
      <img src={img} className={`${styles.titleImg}`} />
      <div className={styles.content}>
        <div className={`${styles.titleContainer}`}>
          <h4>{title}</h4>
          <div className={styles.taContent}>
              <TAProfile classes={`${styles.profile}`}/>
              <div>
                <b>{name}</b>
                <span>{studentId} {` ( year - ${year} )`}</span>
              </div>
          </div>
        </div>
        <div className={`${styles.dateTimeContainer}`}>
          <div className={`${styles.dateTime}`}>
            <span>Date Time : {date} <br />  <i className={styles.time}>{`${startTime} - ${endTime}`}</i> </span>
          </div>
          <div className={`${styles.statusContainer}`}>
            {children}
            </div>
        </div>
      </div>
    </Link>
  )
}

export default Appointment
