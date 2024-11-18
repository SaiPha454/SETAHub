import React from 'react'
import styles from "./HomeSubCard.module.css"

export default function HomeSubCard({img_path, alt_text, title, description}) {
  return (
    <div className={`${styles.photoContainer}`}>
      <div className={`${styles.elementsGp}`}>
        <img className={`${styles.subPhoto}`} src={img_path} alt={alt_text}/>
        <p className={`${styles.title}`}>{title}</p>
        <p className={`${styles.description}`}>{description}</p>
      </div>
    </div>
  )
}

