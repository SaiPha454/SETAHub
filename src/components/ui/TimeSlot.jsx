import React from 'react'
import styles from "./TimeSlot.module.css"


export default function TimeSlot({start, end, onSelect, selected}) {
    
  return (
    <div style={{backgroundColor: selected ? '#ADEBE3' : 'white'}} className={`${styles.timeSlot}`} onClick={onSelect}>
      <span>{start} - {end} </span>
    </div>
  )
}
