import React from 'react'
import styles from "./logo.module.css"
import { Link } from 'react-router-dom'
export default function Logo({url}) {
  return (
    <Link className={styles.logo} to={url}>SETAHub</Link>
  )
}
