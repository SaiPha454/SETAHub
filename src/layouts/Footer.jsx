import React from 'react'
import styles from "./Footer.module.css"
import globalStyle from "../styles/global.module.css"
import FooterContact from '../components/ui/FooterContact'
import EmailIcon from "../assets/email.svg"
import FbIcon from "../assets/fb.svg"
import LineIcon from "../assets/line.svg"
import IgIcon from "../assets/instagram.svg"
import Logo from "../components/ui/Logo"

export default function Footer(props) {
  return (
    <div className={`${styles.footer}`}>
      <div className={`${globalStyle.container} ${styles.footerContent}`}>
        <div className={`${styles.linksContainer}`}>
            <div className={`${styles.linksWrapper}`}>
              {
                props.children
              }
               
            </div>
            <div className={`${styles.contacts}`}>
              <div>
                <span><FooterContact img={EmailIcon} text="setahub@gmail.com" /></span>
                <span><FooterContact img={FbIcon} text="SetaHub" /></span>
              </div>
              <div>
                <span><FooterContact img={LineIcon} text="setahub123" /></span>
                <span><FooterContact img={IgIcon} text="SetaHub" /></span>
              </div>
            </div>
        </div>
        <div className={`${styles.footerTail}`}>
          <Logo/>
          <div className={`${styles.copyright}`}>
              <span>©2024 SETAHub Team. All rights reserved</span>
          </div>
        </div>
      </div>
    </div>
  )
}
