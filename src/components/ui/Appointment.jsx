import React from 'react'
import styles from "./Appointment.module.css"
import TAProfile from "./LinkProfile"

function Appointment({img, title, name, studentId, year, date, startTime, endTime, children, classes}) {
  return (
    <div className={`${styles.appointment} ${classes}`}>
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
            <span>Date Time : {date}  <i className={styles.time}>{`${startTime} - ${endTime}`}</i> </span>
          </div>
          <div className={`${styles.statusContainer}`}>
            {children}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment
