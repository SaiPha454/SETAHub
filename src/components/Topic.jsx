import React from 'react'
import styles from "./Topic.module.css"
import BookButton from "./ui/Button"

function Topic({img,title, tas, books}) {
  return (
    <div className={`${styles.topic}`}>
      <div className={`${styles.topicContent}`}>
        <div className={`${styles.titleContainer}`}>
            <img src={img} className={`${styles.img}`} />
            <span className={`${styles.title}`} >{title}</span>
        </div>
        <div className={`${styles.dataContainer}`}>
            <span className={`${styles.tasText}`}>TAs : {tas}</span>
            <span className={`${styles.bookText}`}>Booked : {books}</span>
        </div>
        <div className={`${styles.footer}`}>
            <BookButton text="Book" width="50%" />
        </div>
      </div>
    </div>
  )
}

export default Topic
