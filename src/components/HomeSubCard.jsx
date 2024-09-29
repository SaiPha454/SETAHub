import React from 'react'
import styles from "./HomeSubCard.module.css"

export default function HomeSubCard({img_path, alt_text}) {
  return (
    <div className={`${styles.photoContainer}`}>
            <img className={`${styles.subPhoto}`} src={img_path} alt={alt_text}/>
    </div>
  )
}

