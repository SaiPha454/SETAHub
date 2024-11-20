import React, {useState} from 'react'
import styles from "./MyTASessions.module.css"
import SwitchTab from '../../components/SwitchTab'
import CompletedTASession from '../../components/CompletedTASession'
import UpcomingTASession from '../../components/UpcomingTASession';


export default function MyTASessions() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.TASessionsTitle}`}>My TA Sessions</h1>
      <div className={`${styles.switch}`}>
        <SwitchTab activeTab={activeTab} setActiveTab={setActiveTab}/>
      </div>
      <div className={`${styles.content}`}>
        {
          activeTab === "upcoming" ? <UpcomingTASession/> : <CompletedTASession />
        }

      </div>

    </div>
  )
}
