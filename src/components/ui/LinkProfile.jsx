import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./LinkProfile.module.css"
import DefaultProfile from "../../assets/profile.svg"

function LinkProfile({img = null, url, classes=''}) {
  console.log("Img :",img)
  return (
    <Link className={`${styles.profile} ${classes}`} to={url} >
        <img src={img ? img : DefaultProfile} className={`${styles.profileImg}`} />
    </Link>
  )
}

export default LinkProfile
