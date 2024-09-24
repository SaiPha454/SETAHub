import React from 'react'
import Topic from '../../components/Topic'
import styles from "./Dashboard.module.css"
import java from "../../assets/demo/java.svg"

export default function Dashboard() {
  return (
    <div className={`${styles.dashboard}`}>
      <div className={`${styles.container}`}>
        <Topic img={java} tas={0} books={0} title='Data Structure and Algorithm' />
        <Topic img={java} tas={0} books={0} title='Java' />
        <Topic img={java} tas={0} books={0} title='Data Structure and Algorithm' />
        <Topic img={java} tas={0} books={0} title='Java' />
        <Topic img={java} tas={0} books={0} title='Data Structure and Algorithm' />
        <Topic img={java} tas={0} books={0} title='Java' />
      </div>
      <br /><br />
    </div>
  )
}
