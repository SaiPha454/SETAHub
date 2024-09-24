import React from 'react'
import styles from "./FooterContact.module.css"
import { Link } from 'react-router-dom'

export default function FooterContact(props) {
  return (
    <Link className={`${styles.contactContainer}`}>
        <img src={props.img} alt='Social Media Icon' className={`${styles.contactIcon}`} />
        <span className={`${styles.text}`}>{props.text}</span>
    </Link>
  )
}
