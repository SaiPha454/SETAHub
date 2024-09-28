import React from 'react'
import styles from "./ProfileTASession.module.css"
import Button from './ui/Button'

export default function ProfileTASession({icon, title, onEdit}) {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.informbox}`}>
        <img src={icon} className={`${styles.icon}`} />
        <span>{title}</span>
      </div>
      <div className={`${styles.editBtnContainer}`}>
        <Button onClick={onEdit} text="Edit Availability" />
      </div>
    </div>
  )
}
