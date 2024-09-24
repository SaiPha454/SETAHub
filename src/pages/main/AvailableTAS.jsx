import React from 'react'
import styles from "./AvailableTAS.module.css"
import { useParams } from 'react-router-dom'

export default function AvailableTAS() {
    const {topicId} = useParams();
  return (
    <div>
      <h1>Available TAS of course {topicId}</h1>
    </div>
  )
}
