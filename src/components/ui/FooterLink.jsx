import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./FooterLink.module.css"

export default function FooterLink({text, url}) {
  return <Link to={url} className={`${styles.link}`}>{text}</Link>
  
}
