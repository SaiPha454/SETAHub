import React from 'react'
import styles from "./Profile.module.css"
import LogOutButton  from '../../components/ui/Button'

export default function Profile() {
  return (
    <div className={`${styles.profile}`}>
      <div className={`${styles.logout}`}>
        <LogOutButton text="Log Out" color='#E33B3B'  />
      </div>
    </div>
  )
}
