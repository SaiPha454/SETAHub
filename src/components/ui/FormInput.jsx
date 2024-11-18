import React from 'react'
import styles from "./FormInput.module.css"

export default function FormInput({label, type,value,onChange,placeholder,onBlur, errorMessage, name}) {
  return (
    <div className={`${styles.formInput}`}>
      <label className={`${styles.label}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        className={`${styles.input} ${errorMessage ? styles.inputError : ''}`}
      />
      {errorMessage && (
        <span className={`${styles.errorText}`}>{errorMessage}</span> // Display error message if it exists
      )}
    </div> 
  )
}