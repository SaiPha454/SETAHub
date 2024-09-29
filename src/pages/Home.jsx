import React from 'react'
import Logo from "../components/ui/Logo"
import JoinButton from "../components/ui/LinkButton"
import "../styles/global.module.css"
import styles from "./Home.module.css"
import HomeCoverImg from "../assets/homecover.png"
import PythonLogoImg from "../assets/pythonLogo.png"
import RustLogoImg from "../assets/rustLogo.png"
import JavaLogoImg from "../assets/javaLogo.png"
import HomeSubCard from '../components/HomeSubCard'


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
      <div className={`${styles.subject}`}>
        <h2 className={`${styles.guideText}`}>Guide and Glow - Share What You Know</h2>
        
        <div className={`${styles.photoGp}`}>
          <HomeSubCard img_path={PythonLogoImg} alt_text="Python Logo Pic" />
          <HomeSubCard img_path={RustLogoImg} alt_text="Rust Logo Pic" />
          <HomeSubCard img_path={JavaLogoImg} alt_text="Java Logo Pic" />
          <div className={`${styles.photoContainer}`}>
            <p>Exam Tips & Tricks</p>
          </div>
        </div>
      </div>
    </div>
  )
}
