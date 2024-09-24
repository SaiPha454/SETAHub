import React from 'react'
import Logo from "../components/ui/Logo"
import JoinButton from "../components/ui/LinkButton"
import "../styles/global.module.css"
import styles from "./Home.module.css"
import HomeCoverImg from "../assets/homecover.png"

export default function Home() {
  return (
    <div className={`${styles.homeContent}`}>
      <div className={`${styles.homeCover}`}>
        <div className={`${styles.homeCoverText}`}>
          <h2 className={`${styles.welcomeText}`}>Welcome To <span>SETAHub</span> </h2>
          <p>Meet Your SE TAs &&  Talk with Them.</p>
          <JoinButton text="Join for free" url="/signup"/>
        </div>
        <div className={`${styles.homeCoverImg}`}>
          <img src={HomeCoverImg} />
        </div>
      </div>

      <div>
        <h1>Ninn Components</h1>
        {/* Ninn Code here */}
      </div>
      <div>
        <h1>Eaint Components</h1>
        {/* Eaint's Code here */}
      </div>
    </div>
  )
}
