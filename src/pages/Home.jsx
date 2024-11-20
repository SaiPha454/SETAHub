import React, { useEffect, useState, useRef } from 'react';
import Logo from "../components/ui/Logo"
import JoinButton from "../components/ui/LinkButton"
import JoinButton2 from "../components/ui/LinkButton2"
import "../styles/global.module.css"
import styles from "./Home.module.css"
import HomeCoverImg from "../assets/homecover.png"
import AllSubsImg from "../assets/all_subs.svg"
import ExpertGuideImg from "../assets/guidance.svg"
import CommunicationImg from "../assets/communication.svg"
import ScheldueImg from "../assets/schedule.svg"
import HomeSubCard from '../components/HomeSubCard'
import BlueFrame from "../components/BlueFrame"
import Display from "../components/Display"
import Display2 from "../components/Display2"


export default function Home() {
  const [isvisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true);
  },[]);

  const [show, doShow] = useState({
    itemOne: false,
    // homeImg: false,
  });

  const ourRef = useRef(null);
  const imgRef = useRef(null);
   
  //for scroll
  useEffect(() => {
    const handleScroll = () => {
        if (!imgRef.current ) return;

        const imgTop = imgRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (imgTop < windowHeight && imgTop > 0) {
            // Image is in the viewport
            setIsVisible(true);
        } else {
            // Image is out of the viewport
            setIsVisible(false);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ourRef.current) return;
      const topPos = ourRef.current.getBoundingClientRect().top;

      const windowHeight = window.innerHeight;

      if (topPos < windowHeight) {
        doShow((state) => ({ ...state, itemOne: true }));
      } else {
        doShow((state) => ({ ...state, itemOne: false }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.homeContent}`}>
      <div className={`${styles.homeCoverWrapper}`}>
      <div className={`${styles.homeCover}`}>
          <div className={`${styles.homeCoverText}`}>
            <h2 className={`${styles.welcomeText}`}>Welcome To &nbsp; <span>SETAHub</span> </h2>
            <p className={`${styles.meetText}`}>Meet Your SE TAs & Talk with Them.</p>
            <p className={`${styles.text}`}>“SETAHub connects junior students with senior TAs
                for academic advice and guidance. Find the right TA 
                for your course and book a session today.”</p>
            <div className={`${styles.buttons}`}>
            <div className={`${styles.button1}`}>
              <JoinButton className={`${styles.JoinButton}`} text="Become a TA" url="/signup"/>
            </div>
            <div className={`${styles.button2}`}>
              {/* <JoinButton className={`${styles.JoinButton}`} text="Meet Your TA" url="/signup"/> */}
              <JoinButton2 text="Meet Your TAs" url="/signup"/>
            </div> 
            </div>
          </div>
          <div className={`${styles.homeCoverImg}`}>
          <img
              src={HomeCoverImg}
              alt="Home Cover"
              className={isvisible ? styles.visible : ''}
              ref={imgRef}
          />
          </div>
        </div>
      </div>

      <div className={`${styles.homewrapper}`}>
        <div className={`${styles.homeBackground}`}>
          <BlueFrame />
        </div>
      </div>

      <div className={`${styles.subject}`}>
        <div className={`${styles.subjectContent}`}>
          <h2 className={`${styles.guideText}`}>What You'll Find on <span className={`${styles.plogo}`}>SETAHub</span></h2>
          
          <div className={`${styles.photoGp}`}>
            <HomeSubCard img_path={AllSubsImg} alt_text="all subjects logo" title = "Mentorship for All Subjects" description ="From Software Engineering fundamentals to advanced topics, our TAs are here to help with it all."/>
            <HomeSubCard img_path={ExpertGuideImg} alt_text="Guide Pic" title ="Expert Guidance" description="Receive personalized support from experienced TAs who understand your academic challenges and are dedicated to your success."/>
            <HomeSubCard img_path={CommunicationImg} alt_text="Communication Pic" title="Easy Communication" description="Our platform makes it simple to connect with TAs through real-time messaging, ensuring you get the help you need without any hassle." />
            <HomeSubCard img_path={ScheldueImg} alt_text="Scheldue Pic" title="Flexible Schelduling" description="Book sessions at times that work for you! Our TAs offer flexible availability, making it easy to fit mentoring into your busy schedule." />
          </div>
        </div>

      <div className={`${styles.homewrapper1}`}>
        <div className={`${styles.homeBackground1}`}>
          <Display />
        </div>
      </div>

      <div className={`${styles.Wrapper}`}>
      <div
          className={`${styles.display2} ${
            show.itemOne ? styles.displayFadeInLeft : ''
          }`}
          animate={show.itemOne}
          ref={ourRef}
        >
          <Display2 />
        </div>
      </div>

      </div>
    </div>
  )
}

