import React from 'react'
import styles from "./FormInput.module.css"

export default function FormInput({label, type,value,onChange,placeholder}) {
  return (
    <div className={`${styles.formInput}`}>
      <label className={`${styles.label}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input}`}
      />
    </div>
  )
}
